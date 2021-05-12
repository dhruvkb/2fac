import { reactive } from 'vue'
import debounce from 'lodash/debounce'
import { screenSizes } from '@/constants/screen_sizes'

export interface Breakpoint {
  w: number
  h: number
  name: string
}

export const breakpoint = reactive({
  w: 0,
  h: 0,
  name: 'z',
} as Breakpoint)

const getBreakpoint = (w: number): string => {
  const breakpointNames = Object.keys(screenSizes).reverse()
  for (let i = 0; i < breakpointNames.length; i += 1) {
    const breakpointName = breakpointNames[i]
    if (w >= screenSizes[breakpointName]) {
      return breakpointName
    }
  }
  return 'z'
}

export const setBreakpoint = (): void => {
  breakpoint.w = window.innerWidth
  breakpoint.h = window.innerHeight
  breakpoint.name = getBreakpoint(window.innerWidth)
}

export const addListener = (): void => {
  window.addEventListener(
    'resize',
    debounce(setBreakpoint, 100),
    false,
  )
}
