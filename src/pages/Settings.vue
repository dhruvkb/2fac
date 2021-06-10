<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Settings</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <Placeholder>
        🚧 Work in progress...
      </Placeholder>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  } from '@ionic/vue'

  import Placeholder from '@/components/Placeholder.vue'

  const ionicComponents = {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  }
  export default defineComponent({
    name: 'Tab2',
    components: {
      ...ionicComponents,
      Placeholder,
    },
  })
</script>
