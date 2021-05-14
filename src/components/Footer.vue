<template>
  <footer class="flex items-center tp:flex-row pb-2-safe pt-2 px-4-safe">
    <div class="hidden tp:block text-sm text-gray-600 p-2">
      An experiment by
      <a
        class="font-bold text-black hover:underline"
        href="https://dhruvkb.github.io/">
        @dhruvkb</a>.
    </div>
    <Navigation class="grid tp:hidden w-full"/>
  </footer>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Navigation from '@/components/Navigation.vue'

  export default defineComponent({
    name: 'Footer',
    components: {
      Navigation,
    },
  })
</script>
