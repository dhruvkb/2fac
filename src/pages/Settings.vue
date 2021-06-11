<template>
  <IonPage>
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
        <div class="uppercase">Sync</div>
      </div>
      <IonList class="border-b border-t">
        <IonItem>
          <IonThumbnail
            class="bg-black"
            slot="start">
            <IonIcon :icon="logoGithub"/>
          </IonThumbnail>
          <IonLabel>GitHub sync</IonLabel>
        </IonItem>
        <IonItem>
          <IonThumbnail
            class="bg-blue-500"
            slot="start">
            <IonIcon :icon="swapVerticalOutline"/>
          </IonThumbnail>
          <IonLabel>Backup & restore</IonLabel>
        </IonItem>
      </IonList>

      <IonList class="border-b border-t mt-4">
        <IonItem
          class="delete text-center"
          :detail="false"
          button
          @click="openAlert">
          <IonLabel>Delete data</IonLabel>
        </IonItem>
      </IonList>

      <div class="opacity-60 text-sm pt-8 pb-2 ion-padding-horizontal">
        <div class="uppercase">About</div>
      </div>
      <IonList class="border-t border-b">
        <IonItem :router-link="aboutLink" detail>
          <IonThumbnail
            class="about"
            slot="start">
            <IonIcon :icon="informationCircleOutline"/>
          </IonThumbnail>
          <IonLabel>About 2Fac</IonLabel>
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
    alertController,
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
    informationCircleOutline,
    logoGithub,
    swapVerticalOutline,
  } from 'ionicons/icons'

  import { toast } from '@/compositions/toast'

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

      const aboutLink = router.resolve({ name: 'about' }).href

      const deleteData = () => {
        store.commit('twoFa/clearAccounts')
        showToast('🗑 Deleted all data!')
      }
      const openAlert = async () => {
        const alert = await alertController
          .create({
            cssClass: 'alert-controller',
            header: 'Permanently delete all data on this device?',
            message: 'If you have not taken a backup, you will lose access to all your accounts.',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
              },
              {
                cssClass: 'delete-button',
                text: 'Delete',
                handler: deleteData,
              },
            ],
          })
        return alert.present()
      }

      return {
        isPlatform,

        logoGithub,
        swapVerticalOutline,
        informationCircleOutline,

        aboutLink,

        openAlert,
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

    &.about {
      background: var(--ion-color-brand);

      ion-icon {
        color: var(--ion-color-brand-contrast);
      }
    }
  }

  .delete {
    --color: var(--ion-color-danger);
  }

  .alert-controller .delete-button {
    color: var(--ion-color-danger);
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
