import { ref } from 'vue'

export const theme = ref('dark')

export const setTheme = (): void => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
  theme.value = prefersDark.matches ? 'dark' : 'light'
  if (theme.value === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export const addListener = (): void => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
  prefersDark.addEventListener(
    'change',
    setTheme,
    false,
  )
}
