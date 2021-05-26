<template>
  <div class="flex flex-row-reverse tp:flex-row items-center">
    <button
      class="font-mono text-2xl hover:underline h-full focus:outline-none focus-visible:underline"
      @click.stop="copyOtp">
      <span>{{ firstThree }}</span>
      <span
        class="-mx-1 transition-colors duration-300"
        :class="[...isCloseToEnd ? ['text-rl', 'dark:text-rd'] : ['text-ll-3', 'dark:text-ld-3']]">·</span>
      <span>{{ lastThree }}</span>
      <span
        class="text-ll-3 dark:text-ld-3 -mx-1 transition-opacity duration-300"
        :class="[...isCloseToEnd ? [] : ['opacity-0']]">!</span>
    </button>
    <Icon
      class="mx-2 text-gl dark:text-gd h-5 w-5 transform transition duration-300"
      :class="[...isCheckVisible ? [] : ['opacity-0', 'translate-x-2', 'tp:-translate-x-2']]"
      name="clipboard-check"/>
  </div>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    ref,
  } from 'vue'
  import { useStore } from 'vuex'

  import Icon from '@/components/Icon.vue'

  export default defineComponent({
    name: 'Otp',
    components: {
      Icon,
    },
    props: {
      otp: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const store = useStore()

      const firstThree = computed(() => props.otp.slice(0, 3))
      const lastThree = computed(() => props.otp.slice(3))

      const isCheckVisible = ref(false)
      const checkTimer = ref(0)
      const copyOtp = () => {
        navigator.clipboard.writeText(props.otp)
        if (checkTimer.value) {
          clearTimeout(checkTimer.value)
        }
        isCheckVisible.value = true
        checkTimer.value = setTimeout(() => {
          isCheckVisible.value = false
        }, 3000)
      }

      const isCloseToEnd = computed(() => store.state.ui.tokens.isCloseToEnd)

      return {
        firstThree,
        lastThree,

        isCheckVisible,
        isCloseToEnd,

        copyOtp,
      }
    },
  })
</script>
