<template>
  <header class="flex items-center justify-between pt-2-safe pb-2 px-4-safe h-12">
    <!-- Teleportation destination -->
    <div class="tp:hidden action-space left flex items-center justify-center"/>

    <div
      class="site-title transition-opacity duration-300"
      :class="[...isHeadingIntersecting ? ['opacity-0'] : ['opacity-1']]">
      <h1 class="flex items-center font-medium">
        {{ currentPage }}
      </h1>
    </div>

    <!-- Teleportation destination -->
    <div class="tp:hidden action-space right flex items-center justify-center"/>

    <Navigation class="hidden tp:grid"/>
  </header>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
  } from 'vue'
  import { useStore } from 'vuex'

  import Navigation from '@/components/Navigation.vue'

  export default defineComponent({
    name: 'Header',
    components: {
      Navigation,
    },
    setup() {
      const store = useStore()
      const currentPage = computed(() => store.state.ui.currentPage)
      const isHeadingIntersecting = computed(() => store.state.ui.isHeadingIntersecting)

      return {
        currentPage,
        isHeadingIntersecting,
      }
    },
  })
</script>
