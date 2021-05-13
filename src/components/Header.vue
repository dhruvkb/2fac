<template>
  <header class="flex">
    <div class="site-title mr-auto">
      <h1 class="flex items-center font-bold text-lg py-1">
        <RouterLink
          class="ml-1"
          :to="{ name: 'home'}">
          2Fac
        </RouterLink>
      </h1>
    </div>

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
