<template>
  <div class="absolute inset-x-0 top-1/2 text-center transform -translate-y-1/2">
    <!-- @slot Content goes here -->
    <slot/>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Placeholder',
  })
</script>
