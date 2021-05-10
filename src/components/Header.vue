<template>
  <header class="flex flex-col items-center tp:flex-row border-b border-gray-200">
    <div class="site-title p-2 tp:mr-auto">
      <h1 class="flex items-center font-bold text-2xl">
        <ion-icon :src="logo"/>
        <RouterLink
          class="ml-1"
          :to="{ name: 'home'}">
          2Fac
        </RouterLink>
      </h1>
    </div>
    <nav class="grid grid-cols-2 self-stretch">
      <RouterLink
        v-for="(link, index) in links"
        :key="index"
        class="flex items-end justify-center px-2 border-b-3 border-transparent transform translate-y-2px"
        :to="{ name: link.toName }"
        active-class="border-black">
        <div class="pb-2">{{ link.text }}</div>
      </RouterLink>
    </nav>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import logo from '@/assets/logo.svg'

  export default defineComponent({
    name: 'Header',
    data() {
      return {
        logo,
        links: [
          {
            text: 'Data',
            toName: 'data',
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
