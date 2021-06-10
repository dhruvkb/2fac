import { ref, Ref } from 'vue'

export interface IntersectionComposition {
  isIntersecting: Ref<boolean>
  observer: IntersectionObserver
}

export const intersection = (options: IntersectionObserverInit): IntersectionComposition => {
  const isIntersecting = ref(false)
  const observer = new IntersectionObserver(([entry]) => {
    isIntersecting.value = entry.isIntersecting
  }, options)

  return {
    observer,
    isIntersecting,
  }
}
