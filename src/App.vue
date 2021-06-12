<template>
  <IonApp>
    <div class="status-bar dark:hidden absolute inset-x-0 top-0 z-10 bg-black"/>
    <IonRouterOutlet/>
  </IonApp>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import {
    IonApp,
    IonRouterOutlet,
  } from '@ionic/vue'

  export default defineComponent({
    name: 'App',
    components: {
      IonApp,
      IonRouterOutlet,
    },
  })
</script>

<style scoped lang="css">
  .status-bar {
    height: env(safe-area-inset-top);
  }
</style>
