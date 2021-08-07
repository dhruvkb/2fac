<template>
  <button
    class="otp font-mono text-xl leading-none p-0"
    :class="[{ 'is-close-to-end': isCloseToEnd }]"
    @click="copyOtp">
    <span class="part">{{ firstThree }}</span>
    <span>{{ lastThree }}</span>
  </button>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
  } from 'vue'
  import { useStore } from 'vuex'

  import { clipboardOutline } from 'ionicons/icons'

  import { toast } from '@/compositions/toast'

  export default defineComponent({
    name: 'Otp',
    props: {
      /**
       * _the name of the site associated with the OTP_; This name appears
       * in the toast notification.
       */
      site: {
        type: String,
        required: true,
      },
      /**
       * _the OTP string to display_; It should be six-characters long.
       */
      otp: {
        type: String,
        required: true,
        validator: (val: string): boolean => val.length === 6,
      },
    },
    setup(props) {
      const store = useStore()

      const { showToast } = toast()

      const firstThree = computed(() => props.otp.slice(0, 3))
      const lastThree = computed(() => props.otp.slice(3))

     const copyOtp = () => {
        if (isSecureContext) {
          navigator.clipboard.writeText(props.otp)
          showToast(`🚀 Copied OTP for <strong>${props.site}</strong> to clipboard!`)
        } else {
          showToast('😭 Could not copy OTP.')
        }
      }

      const isCloseToEnd = computed(() => store.state.ui.tokens.isCloseToEnd)

      return {
        clipboardOutline,

        firstThree,
        lastThree,

        isCloseToEnd,

        copyOtp,
      }
    },
  })
</script>

<style scoped lang="css">
  .otp {
    .part::after {
      content: "‐";
      @apply text-3;
    }

    &.is-close-to-end .part::after {
      @apply text-danger;
    }
  }
</style>
