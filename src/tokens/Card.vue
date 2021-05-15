<template>
  <div
    class="flex items-center bg-white px-4-safe tp:px-2 py-2 border-t border-b tp:border-l tp:border-r border-gray-200 tp:rounded-md tp:shadow-sm">
    <div class="flex items-center justify-center pr-2 border-r border-gray-200"><!-- Site icon -->
      <svg
        v-if="iconSvg"
        class="h-8 w-8 text-gray-600"
        viewBox="0 0 24 24">
        <path :d="iconSvg.path" :fill="iconSvg.color"/>
      </svg>
      <Icon
        v-else
        class="h-8 w-8 text-gray-300"
        name="person-badge"/>
    </div>

    <div class="flex-grow flex flex-col pl-2 min-w-0"><!-- Account info -->
      <div class="font-medium text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">{{ site }}</div>
      <div class="text-sm text-gray-600 whitespace-nowrap overflow-hidden overflow-ellipsis">{{ username }}</div>
      <Otp
        v-if="otp"
        class="hidden tp:flex mt-2"
        :otp="otp"/>
    </div>

    <div class="flex items-center tp:hidden">
      <Otp
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
    data() {
      return {
        checkVisible: false,
        checkTimer: 0,
      }
    },
  })
</script>
