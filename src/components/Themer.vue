<template>
  <div class="themer grid grid-cols-2 self-stretch">
    <div
      v-for="(themeDisplay, themeKey, index) in themes"
      :key="index"
      class="flex items-start justify-center px-2 border-t-3 border-transparent transform -translate-y-2px"
      :class="{ 'border-black': themeKey === activeTheme }"
      @click="changeTheme(themeKey)">
      <div class="pt-2">{{ themeDisplay }}</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Themer',
    data() {
      return {
        activeTheme: 'Light',
        themes: {
          light: 'Light',
          dark: 'Dark',
        },
      }
    },
    watch: {
      activeTheme(toValue, fromValue) {
        if (toValue !== fromValue) {
          document.documentElement.classList.remove(fromValue)
          document.documentElement.classList.add(toValue)
          localStorage.setItem('theme', toValue)
        }
      },
    },
    methods: {
      changeTheme(theme: string) {
        this.activeTheme = theme
      },
    },
    created() {
      this.activeTheme = localStorage.getItem('theme') ?? 'light'
    },
  })
</script>
