<template>
  <!-- Need to specify class `.ion-page` -->
  <IonPage class="ion-page dark-bg">
    <IonHeader translucent>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton
            :default-href="settingsLink"
            :text="isPlatform('ios') ? 'Settings' : null" />
        </IonButtons>
        <IonTitle>GitHub sync</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen>
      <div class="opacity-60 text-sm pt-8 pb-2 ion-padding-horizontal">
        <div class="uppercase">
          Authentication
        </div>
        <p v-if="user">
          You are currently logged in.
        </p>
        <p v-else>
          <a
            class="underline"
            href="https://github.com/settings/tokens/new?description=2Fac&scopes=repo"
            target="_blank">Generate</a>
          a personal access token and use it to log in.
        </p>
      </div>
      <IonList
        class="border-t"
        lines="full">
        <template v-if="user">
          <IonItem>
            <IonAvatar slot="start">
              <img
                :src="user.avatarUrl"
                alt="GitHub profile picture">
            </IonAvatar>
            <IonLabel>
              <div class="font-medium">
                {{ user.name }}
              </div>
              <div class="text-2 text-sm">
                {{ user.username }}
              </div>
            </IonLabel>
          </IonItem>
          <IonItem
            class="text-danger text-center"
            :detail="false"
            button
            @click="logOut">
            <IonLabel>Log out</IonLabel>
          </IonItem>
        </template>
        <template v-else>
          <IonItem>
            <IonTextarea
              v-model="accessToken"
              class="font-mono"
              placeholder="Required"
              required />
          </IonItem>
          <IonItem
            class="text-primary text-center"
            :detail="false"
            button
            @click="logIn">
            <IonLabel>Log in</IonLabel>
          </IonItem>
        </template>
      </IonList>

      <div class="opacity-60 text-sm pt-8 pb-2 ion-padding-horizontal">
        <p>
          Sync accounts with a private GitHub repo to access them from multiple
          devices and for safekeeping.
        </p>
      </div>
      <IonList class="border-t border-b">
        <IonItem
          button
          :disabled="!user"
          :detail="false"
          @click="writeToGitHub">
          <IonThumbnail
            slot="start"
            class="icon-thumbnail text-primary-contrast bg-primary">
            <IonIcon :icon="cloudUploadOutline" />
          </IonThumbnail>
          Export to GitHub
        </IonItem>

        <IonItem
          button
          :disabled="!user"
          :detail="false"
          @click="readFromGitHub">
          <IonThumbnail
            slot="start"
            class="icon-thumbnail text-primary-contrast bg-primary">
            <IonIcon :icon="downloadOutline" />
          </IonThumbnail>
          Import from GitHub
        </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    onMounted,
    ref,
  } from 'vue'
  import { useRouter } from 'vue-router'
  import { Octokit } from 'octokit'

  import {
    IonAvatar,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTextarea,
    IonThumbnail,
    IonTitle,
    IonToolbar,
    isPlatform,
  } from '@ionic/vue'
  import {
    cloudUploadOutline,
    downloadOutline,
  } from 'ionicons/icons'

  import { toast } from '@/compositions/toast'

  import type { GitHubUser } from '@/models/github'

  import {
    createNewBranch,
    getBranchSha,
    getDefaultBranch,
    getFile,
    getUserDetails,
    updateFile,
  } from '@/support/github'
  import { useTwoFac } from '@/stores/two_fac'
  import { storeToRefs } from 'pinia'

  export default defineComponent({
    name: 'Settings',
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonButtons,
      IonBackButton,
      IonTitle,
      IonContent,
      IonList,
      IonItem,
      IonAvatar,
      IonLabel,
      IonTextarea,
      IonThumbnail,
      IonIcon,
    },
    setup() {
      const twoFacStore = useTwoFac()
      const { accountsJson: json } = storeToRefs(twoFacStore)

      const router = useRouter()

      const { showToast } = toast()

      const settingsLink = router.resolve({ name: 'settings' }).href

      const accessTokenRef = ref('')
      const accessToken = computed({
        get(): string {
          return accessTokenRef.value
        },
        set(val: string) {
          accessTokenRef.value = val
          localStorage.setItem('accessToken', val)
        },
      })
      onMounted(() => {
        accessTokenRef.value = localStorage.getItem('accessToken') ?? ''
      })

      const isLoggedInRef = ref(false)
      const isLoggedIn = computed({
        get(): boolean {
          return isLoggedInRef.value
        },
        set(val: boolean) {
          isLoggedInRef.value = val
          localStorage.setItem('isLoggedIn', val.toString())
        },
      })
      onMounted(() => {
        isLoggedInRef.value = (localStorage.getItem('isLoggedIn') ?? 'false') === 'true'
      })

      let octokit: Octokit
      const user = ref<GitHubUser | null>(null)
      const logIn = async (event: Event | null, failSilently = false) => {
        octokit = new Octokit({ auth: accessToken.value })
        try {
          user.value = await getUserDetails(octokit)
          isLoggedIn.value = true
        } catch (ex) {
          let message: string
          if (ex instanceof Error) message = ex.message
          else message = String(ex)
          if (!failSilently && message === 'Bad credentials') {
            showToast('⛔️ You entered an invalid token.')
          }
        }
      }
      const logOut = () => {
        isLoggedIn.value = false
        user.value = null
      }
      onMounted(async () => {
        if (accessToken.value && isLoggedIn.value) {
          await logIn(null, true)
        }
      })

      const writeToGitHub = async () => {
        if (!user.value) {
          return
        }
        const { username } = user.value

        const defaultBranchName = await getDefaultBranch(octokit, username)
        const file = await getFile(octokit, username, defaultBranchName)
        if (file.content === json.value) {
          showToast('🆗 GitHub repo is already up-to-date.')
          return
        }

        const branchSha = await getBranchSha(octokit, username, defaultBranchName)
        const newBranchName = Date.now().toString() // TODO: Use semantic branch names
        await createNewBranch(octokit, username, newBranchName, branchSha)

        const newFile = await getFile(octokit, username, newBranchName)
        if (newFile.sha) { // Will always be true
          await updateFile(octokit, username, newBranchName, json.value, newFile.sha)
        }
        showToast(`☁️ Pushed accounts to branch <strong>${newBranchName}</strong>.`)
      }
      const readFromGitHub = async () => {
        if (!user.value) {
          return
        }
        const { username } = user.value

        const defaultBranchName = await getDefaultBranch(octokit, username)
        const file = await getFile(octokit, username, defaultBranchName)
        if (file.content) {
          const accPojos = JSON.parse(file.content)
          twoFacStore.clearAccounts()
          twoFacStore.loadAccounts(accPojos)
          showToast(`📂 Imported <strong>${accPojos.length}</strong> accounts.`)
        }
      }

      return {
        isPlatform,

        downloadOutline,
        cloudUploadOutline,

        settingsLink,

        accessToken,
        user,

        logIn,
        logOut,
        writeToGitHub,
        readFromGitHub,
      }
    },
  })
</script>
