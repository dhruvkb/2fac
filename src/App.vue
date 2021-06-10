<template>
  <IonApp>
    <IonRouterOutlet/>
  </IonApp>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import {
    IonApp,
    IonRouterOutlet,
  } from '@ionic/vue'

  const ionicComponents = {
    IonApp,
    IonRouterOutlet,
  }
  export default defineComponent({
    name: 'App',
    components: ionicComponents,
  })
</script>
