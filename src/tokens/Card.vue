<template>
  <div
    class="card flex tp:items-center bg-gl-6 dark:bg-gd-5 tp:p-2 tp:border border-sep-l dark:border-sep-d tp:rounded-md">
    <div class="flex items-center justify-center py-2 tp:py-0 py-2 tp:py-0 pl-4-safe tp:pl-0 pr-4"><!-- Site logo -->
      <div
        class="h-9 w-9 flex items-center justify-center rounded-md"
        :class="[...iconSvg ? [] : ['bg-gd-5', 'dark:bg-gl-6']]"
        :style="{...iconSvg ? {backgroundColor: iconSvg.color} : {}}">
        <svg
          v-if="iconSvg"
          class="h-6 w-6"
          viewBox="0 0 24 24">
          <path :d="iconSvg.path" :fill="tone"/>
        </svg>
        <Icon
          v-else
          class="h-6 w-6 text-ld-1 dark:text-ll-1"
          name="person-badge"/>
      </div>
    </div>

    <div class="acc flex-grow flex flex-col justify-center py-2 tp:py-0 min-w-0 tp:border-none border-sep-l dark:border-sep-d"><!-- Account info -->
      <div class="font-medium text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">{{ site }}</div>
      <div class="text-sm text-ll-2 dark:text-ld-2 whitespace-nowrap overflow-hidden overflow-ellipsis">{{ username }}</div>
      <Otp
        v-if="otp"
        class="hidden tp:flex mt-2"
        :otp="otp"/>
    </div>

    <div class="otp flex items-center tp:hidden pr-4-safe border-sep-l dark:border-sep-d"><!-- OTP -->
      <Otp
        class="h-full"
        v-if="otp"
        :otp="otp"/>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    PropType,
  } from 'vue'

  import Icon from '@/components/Icon.vue'
  import Otp from '@/tokens/Otp.vue'

  import { IconSvg } from '@/models/icon_svg'

  import { rgbFromHex, perceivedLuminance } from '@/support/color'

  export default defineComponent({
    name: 'Card',
    components: {
      Icon,
      Otp,
    },
    props: {
      site: {
        type: String,
      },
      username: {
        type: String,
      },
      iconSvg: {
        type: Object as PropType<IconSvg>,
      },
      otp: {
        type: String,
      },
    },
    computed: {
      tone(): string | null {
        if (this.iconSvg) {
          const luminance = perceivedLuminance(rgbFromHex(this.iconSvg.color))
          if (luminance < 0.5) {
            return 'white'
          }
          return 'black'
        }
        return null
      },
    },
  })
</script>

<style scoped lang="css">
  .card .acc,
  .card .otp {
    border-top-width: var(--mp-border-top);
  }
</style>
