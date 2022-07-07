<template>
  <IonPage class="ion-page dark-bg">
    <!-- Need to specify class `.ion-page` -->
    <IonHeader translucent>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton
            :default-href="settingsLink"
            :text="isPlatform('ios') ? 'Settings' : null" />
        </IonButtons>
        <IonTitle>Backup & restore</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen>
      <div class="opacity-60 text-sm pt-8 pb-2 ion-padding-horizontal">
        <p>
          Export all your accounts as a JSON file. This file can be imported
          into 2Fac on a different device.
        </p>
      </div>
      <IonList class="border-t border-b">
        <IonItem
          :detail="false"
          button
          @click="writeToFile">
          <IonThumbnail
            slot="start"
            class="icon-thumbnail text-primary-contrast bg-primary">
            <IonIcon :icon="documentOutline" />
          </IonThumbnail>
          Write to file
        </IonItem>

        <input
          v-show="false"
          ref="fileInput"
          type="file"
          accept=".json"
          @change="updateFile">
        <IonItem
          :detail="false"
          button
          @click="clickInput">
          <IonThumbnail
            slot="start"
            class="icon-thumbnail text-primary-contrast bg-primary">
            <IonIcon :icon="downloadOutline" />
          </IonThumbnail>
          Read from file
        </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref,
  } from 'vue'
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
  import { useTwoFac } from '@/stores/two_fac'
  import { storeToRefs } from 'pinia'
  import { toast } from '@/compositions/toast'

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
      const twoFacStore = useTwoFac()
      const { accountsJson: json } = storeToRefs(twoFacStore)

      const router = useRouter()

      const { showToast } = toast()

      const settingsLink = router.resolve({ name: 'settings' }).href

      const writeToFile = () => {
        const blob = new Blob([json.value], { type: 'application/json' })
        const blobUrl = URL.createObjectURL(blob)
        const anchor = document.createElement('a')
        anchor.href = blobUrl
        anchor.download = 'secrets.json'
        document.body.appendChild(anchor)
        anchor.click()
        document.body.removeChild(anchor)
        URL.revokeObjectURL(blobUrl)
      }

      const fileInput = ref<HTMLInputElement | null>(null)
      const readFromFile = (file: File) => {
        const reader = new FileReader()
        reader.onload = () => {
          const accPojos = JSON.parse(reader.result as string)
          twoFacStore.clearAccounts()
          twoFacStore.loadAccounts(accPojos)
          showToast(`📂 Imported <strong>${accPojos.length}</strong> accounts.`)
        }
        reader.onerror = () => {
          // TODO: Improve error reporting
          // eslint-disable-next-line no-console
          console.log(reader.error)
        }
        reader.onloadend = () => {
          if (fileInput.value) {
            fileInput.value.files = null
          }
        }
        reader.readAsText(file)
      }
      const updateFile = (event: Event) => {
        const [file] = (event.target as HTMLInputElement).files ?? []
        readFromFile(file)
      }
      const clickInput = () => {
        if (fileInput.value) {
          fileInput.value.click()
        }
      }

      return {
        isPlatform,

        documentOutline,
        downloadOutline,

        settingsLink,

        writeToFile,

        fileInput,
        updateFile,
        clickInput,
      }
    },
  })
</script>
