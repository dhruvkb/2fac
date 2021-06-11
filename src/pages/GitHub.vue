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
      <div class="h-full w-full flex items-center justify-center">
        🚧 WIP
      </div>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useRouter } from 'vue-router'

  import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    isPlatform,
  } from '@ionic/vue'

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
    },
    setup() {
      const router = useRouter()

      const settingsLink = router.resolve({ name: 'settings' }).href

      return {
        isPlatform,

        settingsLink,
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
