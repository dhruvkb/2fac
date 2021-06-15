<template>
  <IonPage class="ion-page dark-bg"><!-- Need to specify class `.ion-page` -->
    <IonHeader translucent>
      <IonToolbar>
        <IonTitle>Settings</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen>
      <IonHeader
        v-if="isPlatform('ios')"
        collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div class="opacity-60 text-sm pt-8 pb-2 ion-padding-horizontal">
        <div class="uppercase">About</div>
      </div>
      <IonList class="border-t border-b">
        <IonItem
          :router-link="aboutLink"
          detail>
          <IonThumbnail
            class="icon-thumbnail text-brand-contrast bg-brand"
            slot="start">
            <IonIcon :icon="informationOutline"/>
          </IonThumbnail>
          <IonLabel>About 2Fac</IonLabel>
        </IonItem>
      </IonList>

      <div class="opacity-60 text-sm pt-8 pb-2 ion-padding-horizontal">
        <div class="uppercase">Sync</div>
      </div>
      <IonList class="border-b border-t">
        <IonItem
          :router-link="gitHubLink"
          detail>
          <IonThumbnail
            class="icon-thumbnail text-white bg-black"
            slot="start">
            <IonIcon :icon="logoGithub"/>
          </IonThumbnail>
          <IonLabel>GitHub sync</IonLabel>
        </IonItem>
        <IonItem
          :router-link="localLink"
          detail>
          <IonThumbnail
            class="icon-thumbnail text-primary-contrast bg-primary"
            slot="start">
            <IonIcon :icon="swapVerticalOutline"/>
          </IonThumbnail>
          <IonLabel>Backup & restore</IonLabel>
        </IonItem>
      </IonList>

      <IonList class="border-b border-t mt-4">
        <IonItem
          class="text-danger text-center"
          :detail="false"
          button
          @click="openAlert">
          <IonLabel>Delete all data</IonLabel>
        </IonItem>
      </IonList>

      <div class="flex flex-col items-center mt-16">
        <span class="opacity-50 text-sm">an experiment by</span>
        <a
          class="font-mono font-bold text-transparent bg-gradient-to-r from-[#dc322f] to-[#d33682] bg-clip-text"
          href="https://dhruvkb.github.io"
          target="_blank">@dhruvkb</a>
      </div>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'

  import {
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonThumbnail,
    IonTitle,
    IonToolbar,
    isPlatform,
  } from '@ionic/vue'
  import {
    informationOutline,
    logoGithub,
    swapVerticalOutline,
  } from 'ionicons/icons'

  import { toast } from '@/compositions/toast'
  import { alert } from '@/compositions/alert'

  export default defineComponent({
    name: 'Settings',
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonList,
      IonItem,
      IonThumbnail,
      IonIcon,
      IonLabel,
    },
    setup() {
      const store = useStore()
      const router = useRouter()

      const { showToast } = toast()
      const { showDangerAlert } = alert()

      const gitHubLink = router.resolve({ name: 'gitHub' }).href
      const localLink = router.resolve({ name: 'local' }).href
      const aboutLink = router.resolve({ name: 'about' }).href

      const deleteData = () => {
        store.commit('twoFa/clearAccounts')
        showToast('🗑 Deleted all data!')
      }
      const openAlert = () => {
        showDangerAlert(
          'Permanently delete all data from this device?',
          'If you have not taken a backup, you will lose access to all your accounts.',
          {
            text: 'Delete',
            handler: deleteData,
          },
        )
      }

      return {
        isPlatform,

        informationOutline,
        logoGithub,
        swapVerticalOutline,

        gitHubLink,
        localLink,
        aboutLink,

        openAlert,
      }
    },
  })
</script>
