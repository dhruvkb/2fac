<template>
  <footer class="flex flex-col items-center tp:flex-row text-sm border-t border-gray-200">
    <Themer class="tp:mr-auto"/>
    <div class="text-gray-600 p-2">
      An experiment by
      <a
        class="font-bold text-black hover:underline"
        href="https://dhruvkb.github.io/">
        @dhruvkb</a>.
    </div>
  </footer>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import Themer from '@/components/Themer.vue'

  export default defineComponent({
    components: {
      Themer,
    },
  })
</script>
