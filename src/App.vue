<template>
  <div class="flex flex-col min-h-screen" id="app-root">
    <Header class="flex-grow-0"/>
    <RouterView class="flex-grow"/>
    <Footer class="flex-grow-0"/>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'

  export default defineComponent({
    components: {
      Header,
      Footer,
    },
  })
</script>

<style scoped lang="css">
  #app-root {
    padding:
      max(env(safe-area-inset-top), 1em)
      max(env(safe-area-inset-right), 1em)
      max(env(safe-area-inset-bottom), 1em)
      max(env(safe-area-inset-left), 1em);
  }
</style>
