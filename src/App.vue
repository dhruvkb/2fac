<template>
  <div id="app-root" class="flex flex-col bg-gl-5 dark:bg-gd-6 min-h-screen">
    <div
      class="bar top-0 border-b transition-all duration-300"
      :class="headerClasses">
      <Header class="w-full"/>
    </div>
    <div class="content-root flex-grow">
      <RouterView/>
    </div>
    <div class="bar tp:relative bottom-0 border-t">
      <Footer class="w-full"/>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
  } from 'vue'

  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'

  import {
    addListener,
    setBreakpoint,
  } from '@/plugins/responsive'
  import { useStore } from 'vuex'

  export default defineComponent({
    components: {
      Header,
      Footer,
    },
    setup() {
      const store = useStore()

      setBreakpoint()
      addListener()

      const isHeadingIntersecting = computed(() => store.state.ui.isHeadingIntersecting)
      const headerClasses = computed(() => [
        ...isHeadingIntersecting.value
          ? ['dark:border-tx']
          : ['border-sep-l', 'dark:border-sep-d'],
      ])

      return {
        headerClasses,
      }
    },
  })
</script>
