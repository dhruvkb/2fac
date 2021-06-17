<template>
  <IonPage class="ion-page dark-bg"><!-- Need to specify class `.ion-page` -->
    <IonHeader translucent>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton
            :default-href="settingsLink"
            :text="isPlatform('ios') ? 'Settings' : null"/>
        </IonButtons>
        <IonTitle>GitHub sync</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen>
      <div class="opacity-60 text-sm pt-8 pb-2 ion-padding-horizontal">
        <div class="uppercase">Authentication</div>
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
                alt="GitHub profile picture"/>
            </IonAvatar>
            <IonLabel>
              <div class="font-medium">{{ user.name }}</div>
              <div class="text-2 text-sm">{{ user.username }}</div>
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
              required/>
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
            class="icon-thumbnail text-primary-contrast bg-primary"
            slot="start">
            <IonIcon :icon="cloudUploadOutline"/>
          </IonThumbnail>
          Export to GitHub
        </IonItem>

        <IonItem
          button
          :disabled="!user"
          :detail="false"
          @click="readFromGitHub">
          <IonThumbnail
            class="icon-thumbnail text-primary-contrast bg-primary"
            slot="start">
            <IonIcon :icon="downloadOutline"/>
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
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import { Octokit } from '@octokit/rest'

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

  import { GitHubUser } from '@/models/github'

  import {
    createNewBranch,
    getBranchSha,
    getDefaultBranch,
    getFile,
    getUserDetails,
    updateFile,
  } from '@/support/github'

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
      const store = useStore()
      const router = useRouter()

      const { showToast } = toast()

      const settingsLink = router.resolve({ name: 'settings' }).href

      const accessToken_ = ref('')
      const accessToken = computed({
        get(): string {
          return accessToken_.value
        },
        set(val: string) {
          accessToken_.value = val
          localStorage.setItem('accessToken', val)
        },
      })
      onMounted(() => {
        accessToken_.value = localStorage.getItem('accessToken') ?? ''
      })

      const isLoggedIn_ = ref(false)
      const isLoggedIn = computed({
        get(): boolean {
          return isLoggedIn_.value
        },
        set(val: boolean) {
          isLoggedIn_.value = val
          localStorage.setItem('isLoggedIn', val.toString())
        },
      })
      onMounted(() => {
        isLoggedIn_.value = (localStorage.getItem('isLoggedIn') ?? 'false') === 'true'
      })

      let octokit: Octokit
      const user = ref<GitHubUser | null>(null)
      const logIn = async (event: Event | null, failSilently = false) => {
        octokit = new Octokit({ auth: accessToken.value })
        try {
          user.value = await getUserDetails(octokit)
          isLoggedIn.value = true
        } catch (ex) {
          if (!failSilently && ex.message === 'Bad credentials') {
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
        const json = store.getters['twoFa/accountsJson']

        const defaultBranchName = await getDefaultBranch(octokit, username)
        const file = await getFile(octokit, username, defaultBranchName)
        if (file.content === json) {
          showToast('🆗 GitHub repo is already up-to-date.')
          return
        }

        const branchSha = await getBranchSha(octokit, username, defaultBranchName)
        const newBranchName = Date.now().toString() // TODO: Use semantic branch names
        await createNewBranch(octokit, username, newBranchName, branchSha)

        const newFile = await getFile(octokit, username, newBranchName)
        if (newFile.sha) { // Will always be true
          await updateFile(octokit, username, newBranchName, json, newFile.sha)
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
          store.commit('twoFa/clearAccounts')
          store.commit('twoFa/loadAccounts', { accPojos })
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
