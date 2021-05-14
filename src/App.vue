<template>
  <div id="app-root" class="flex flex-col min-h-screen bg-gray-50">
    <div class="wrapper top-0 px-2-safe tp:px-4-safe pt-2-safe pb-2 border-b">
      <Header class="w-full"/>
    </div>
    <div class="content-root flex-grow px-2-safe tp:px-4-safe ">
      <RouterView/>
    </div>
    <div class="wrapper tp:relative px-2-safe tp:px-4-safe pt-2 pb-2-safe bottom-0 border-t">
      <Footer class="w-full"/>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'

  import { addListener, setBreakpoint } from '@/plugins/responsive'

  export default defineComponent({
    components: {
      Header,
      Footer,
    },
    setup() {
      setBreakpoint()
      addListener()
    },
  })
</script>
