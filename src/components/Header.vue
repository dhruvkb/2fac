<template>
  <header class="flex justify-between">
    <div class="site-title">
      <h1 class="flex items-center font-bold text-lg py-1">
        <RouterLink :to="{ name: 'home'}">2Fac</RouterLink>
      </h1>
    </div>

    <!-- Teleportation destination -->
    <div class="action-space flex items-center justify-center"/>

    <Navigation class="hidden tp:grid"/>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import Navigation from '@/components/Navigation.vue'

  export default defineComponent({
    name: 'Header',
    components: {
      Navigation,
    },
  })
</script>
