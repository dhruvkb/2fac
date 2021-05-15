<template>
  <div class="flex flex-row-reverse tp:flex-row items-center">
    <button
      class="font-mono text-2xl hover:underline focus:outline-none focus-visible:underline"
      @click.stop="copyOtp">
      {{ firstThree }}<span class="text-gray-300 -mx-1 select-none">·</span>{{ lastThree }}
    </button>
    <div
      class="mr-2 ml-2 transform transition duration-300"
      :class="[ ...isCheckVisible ? [] : ['opacity-0', 'translate-x-2 tp:-translate-x-2'] ]">
      <Icon
        class="text-green-600 h-5 w-5"
        name="clipboard-check"/>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    ref,
  } from 'vue'

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

      return {
        firstThree,
        lastThree,
        isCheckVisible,
        copyOtp,
      }
    },
  })
</script>
