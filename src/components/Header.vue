<template>
  <header class="flex flex-col items-center tp:flex-row border-b border-gray-200">
    <div class="site-title p-2 tp:mr-auto">
      <h1 class="flex items-center font-bold text-2xl">
        <ion-icon name="id-card-outline"/>
        <RouterLink
          class="ml-1"
          :to="{ name: 'home'}">
          Multifac
        </RouterLink>
      </h1>
    </div>
    <nav class="grid grid-cols-2 self-stretch">
      <RouterLink
        class="flex items-end justify-center text-black px-2 border-b-2 border-transparent"
        v-for="(link, index) in links"
        :key="index"
        :to="{ name: link.toName }"
        active-class="border-black">
        <div class="pb-2">{{ link.text }}</div>
      </RouterLink>
    </nav>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Header',
    data() {
      return {
        links: [
          {
            text: 'Integration',
            toName: 'integration',
          },
          {
            text: 'About',
            toName: 'about',
          },
        ],
      }
    },
  })
</script>
