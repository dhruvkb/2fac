<template>
  <span v-show="false">&nbsp;</span>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    onBeforeUnmount,
    onMounted,
    ref,
  } from 'vue'
  import { useStore } from 'vuex'

  export default defineComponent({
    name: 'Timeline',
    setup() {
      const store = useStore()

      const interval = 30 // seconds
      const timeConsumed = ref(0)
      const updateTime = () => {
        const seconds = Math.floor(Date.now() / 1e3)
        timeConsumed.value = seconds % interval

        if (timeConsumed.value === 25) {
          store.commit('ui/setIsCloseToEnd', { isCloseToEnd: true })
        }
        if (timeConsumed.value === 0) {
          store.commit('twoFa/updateAccounts')
          store.commit('ui/setIsCloseToEnd', { isCloseToEnd: false })
        }
      }
      const timeRemaining = computed(() => interval - timeConsumed.value)

      const timeTimer = ref(0)
      onMounted(() => {
        timeTimer.value = setInterval(updateTime, 1000)
      })
      onBeforeUnmount(() => {
        if (timeTimer.value) {
          clearInterval(timeTimer.value)
        }
      })

      return {
        timeConsumed,
        timeRemaining,
      }
    },
  })
</script>
