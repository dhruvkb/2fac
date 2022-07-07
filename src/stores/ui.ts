import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUi = defineStore('ui', () => {
  const currentPage = ref('')
  const isHeadingIntersecting = ref(false)
  const tokensIsCloseToEnd = ref(false)
  const tokensIsEditing = ref(false)
  const icons = ref<Record<string, string>>({})

  return {
    currentPage,
    isHeadingIntersecting,
    tokensIsCloseToEnd,
    tokensIsEditing,
    icons,
  }
})
