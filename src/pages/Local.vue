<template>
  <IonPage>
    <IonHeader translucent>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton
            :default-href="settingsLink"
            :text="isPlatform('ios') ? 'Settings' : null"/>
        </IonButtons>
        <IonTitle>Backup & restore</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen>
      <div class="opacity-60 text-sm pt-8 pb-2 ion-padding-horizontal">
        <p>
          Get all your accounts as a JSON file that can be imported into another
          2Fac instance.
        </p>
      </div>
      <IonList class="border-t border-b">
        <IonItem
          button
          :detail="false"
          @click="writeToFile">
          <IonThumbnail
            class="bg-blue-500"
            slot="start">
            <IonIcon :icon="documentOutline"/>
          </IonThumbnail>
          Write to file
        </IonItem>

        <input
          v-show="false"
          id="json"
          type="file"
          @change="updateFile"
          ref="json"/>
        <label for="json">
          <IonItem>
            <IonThumbnail
              class="bg-blue-500"
              slot="start">
              <IonIcon :icon="downloadOutline"/>
            </IonThumbnail>
            Read from file
          </IonItem>
        </label>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref,
  } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'

  import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonList,
    IonPage,
    IonThumbnail,
    IonTitle,
    IonToolbar,
    isPlatform,
  } from '@ionic/vue'
  import {
    documentOutline,
    downloadOutline,
  } from 'ionicons/icons'

  import { toast } from '@/compositions/toast'

  interface FileInputEvent extends Event {
    target: HTMLInputElement & EventTarget
  }

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
      IonThumbnail,
      IonIcon,
    },
    setup() {
      const store = useStore()
      const router = useRouter()

      const { showToast } = toast()

      const settingsLink = router.resolve({ name: 'settings' }).href

      const writeToFile = () => {
        const blob = new Blob([store.getters['twoFa/accountsJson']], { type: 'application/json' })
        const blobUrl = URL.createObjectURL(blob)
        const anchor = document.createElement('a')
        anchor.href = blobUrl
        anchor.download = '2fac.json'
        document.body.appendChild(anchor)
        anchor.click()
        document.body.removeChild(anchor)
        URL.revokeObjectURL(blobUrl)
      }

      const json = ref<HTMLInputElement | null>(null)
      const readFromFile = (file: File) => {
        const reader = new FileReader()
        reader.onload = () => {
          const accPojos = JSON.parse(reader.result as string)
          store.commit('twoFa/clearAccounts')
          store.commit('twoFa/loadAccounts', { accPojos })
          showToast(`📂 Imported ${accPojos.length} accounts.`)
        }
        reader.onerror = () => {
          console.log(reader.error)
        }
        reader.onloadend = () => {
          if (json.value) {
            json.value.files = null
          }
        }
        reader.readAsText(file)
      }
      const updateFile = (event: FileInputEvent) => {
        const [file] = event.target.files ?? []
        readFromFile(file)
      }

      return {
        isPlatform,

        documentOutline,
        downloadOutline,

        settingsLink,

        writeToFile,

        json,
        updateFile,
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

  ion-thumbnail {
    @apply flex items-center justify-center;
    @apply h-7 w-7;
    @apply rounded-md;
    @apply mr-4;

    ion-icon {
      @apply h-5 w-5;
      @apply text-white;
    }
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
