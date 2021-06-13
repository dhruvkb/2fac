<template>
  <IonPage>
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
              <div class="username text-sm">{{ user.username }}</div>
            </IonLabel>
          </IonItem>
          <IonItem
            class="log-out text-center"
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
            class="log-in text-center"
            :detail="false"
            button
            @click="logIn">
            <IonLabel>Log in</IonLabel>
          </IonItem>
        </template>
      </IonList>

      <div class="opacity-60 text-sm pt-8 pb-2 ion-padding-horizontal">
        <p>
          Sync accounts with a private GitHub repo for both syncing multiple
          devices and safekeeping.
        </p>
      </div>
      <IonList class="border-t border-b">
        <IonItem
          button
          :disabled="!user"
          :detail="false"
          @click="writeToGitHub">
          <IonThumbnail
            class="icon-thumbnail bg-blue-500"
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
            class="icon-thumbnail bg-blue-500"
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

      let octokit: Octokit
      const token = ref('')
      const user = ref<GitHubUser | null>(null)
      const accessToken = computed({
        get(): string {
          return token.value
        },
        set(val: string) {
          token.value = val
          localStorage.setItem('access_token', val)
        },
      })
      const logIn = async (event: Event | null, failSilently = false) => {
        octokit = new Octokit({ auth: token.value })
        try {
          user.value = await getUserDetails(octokit)
        } catch (ex) {
          if (!failSilently && ex.message === 'Bad credentials') {
            showToast('⛔️ You entered an invalid token.')
          }
        }
      }
      const logOut = () => {
        accessToken.value = ''
        user.value = null
      }
      onMounted(async () => {
        token.value = localStorage.getItem('access_token') ?? ''
        if (accessToken.value) {
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

<style scoped lang="css">
  .ios ion-toolbar,
  .ios ion-content {
    --background: var(--g-5);
  }

  .md ion-content {
    --background: var(--e--1);
  }

  .username {
    color: var(--l-2);
  }

  .log-in {
    --color: var(--ion-color-primary);
  }

  .log-out {
    --color: var(--ion-color-danger);
  }

  @media (prefers-color-scheme: dark) {
    .ios ion-toolbar,
    .ios ion-content {
      --background: var(--g-6);
      --ion-item-background: var(--g-5);
    }

    .md ion-content {
      --background: var(--e-1);
      --ion-item-background: var(--e-2);
    }
  }
</style>
