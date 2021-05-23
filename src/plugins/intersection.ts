import {
  computed,
  ComputedRef,
  onBeforeUnmount,
  onMounted,
  Ref,
  ref,
} from 'vue'
import { useStore } from 'vuex'

interface Intersection {
  marker: Ref<HTMLElement | null>
  isHeadingIntersecting: ComputedRef<boolean>
  headerClasses: ComputedRef<string[]>
}

export const intersection = (): Intersection => {
  const store = useStore()

  const marker = ref<HTMLElement | null>(null)
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    store.commit('ui/setIsHeadingIntersecting', {
      isHeadingIntersecting: entry.isIntersecting,
    })
  }, {
    rootMargin: '-16px',
    threshold: 1.0,
  })
  const isHeadingIntersecting = computed(() => store.state.ui.isHeadingIntersecting)
  const headerClasses = computed(() => [isHeadingIntersecting.value ? 'opacity-100' : 'opacity-0'])

  onMounted(() => {
    if (marker.value) {
      intersectionObserver.observe(marker.value)
    }
  })
  onBeforeUnmount(() => {
    intersectionObserver.disconnect()
  })

  return {
    marker,
    isHeadingIntersecting,
    headerClasses,
  }
}
