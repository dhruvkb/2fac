<template>
  <IonItem>
    <IonThumbnail
      slot="start"
      class="thumbnail flex items-center justify-start h-9 w-9 mr-4">
      <div
        class="logo-box flex items-center h-full w-full justify-center rounded-md"
        :style="{...iconSvg ? {backgroundColor: iconSvg.color} : {}}">
        <svg
          v-if="iconSvg"
          class="h-6 w-6"
          viewBox="0 0 24 24">
          <path
            :d="iconSvg.path"
            :fill="tone" />
        </svg>
        <span
          v-else
          class="initial text-2xl font-semibold">{{ site ? site[0] : '?' }}</span>
      </div>
    </IonThumbnail>
    <IonLabel>
      <div class="flex items-center justify-between">
        <!-- Cannot apply these classes to IonLabel -->
        <div class="min-w-0">
          <div class="site font-medium">
            <!-- @slot Non-text value for site goes here -->
            <slot name="site">
              {{ site }}
            </slot>
          </div>
          <div class="username text-2 text-sm">
            <!-- @slot Non-text value for username goes here -->
            <slot name="username">
              {{ username }}
            </slot>
          </div>
        </div>
        <Otp
          v-if="otp && otp.length === 6"
          :site="site"
          :otp="otp" />
      </div>
    </IonLabel>
  </IonItem>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    type PropType,
  } from 'vue'

  import {
    IonItem,
    IonLabel,
    IonThumbnail,
  } from '@ionic/vue'
  import { idCardOutline } from 'ionicons/icons'

  import Otp from '@/tokens/Otp.vue'

  import type { IconSvg } from '@/models/icon_svg'

  import {
    perceivedLuminance,
    rgbFromHex,
  } from '@/support/color'

  const ionicComponents = {
    IonItem,
    IonThumbnail,
    IonLabel,
  }
  export default defineComponent({
    name: 'Row',
    components: {
      ...ionicComponents,
      Otp,
    },
    props: {
      site: {
        type: String,
        default: undefined,
      },
      username: {
        type: String,
        default: undefined,
      },
      iconSvg: {
        type: Object as PropType<IconSvg>,
        default: undefined,
      },
      otp: {
        type: String,
        default: undefined,
      },
    },
    setup(props) {
      const tone = computed(() => {
        if (props.iconSvg) {
          const luminance = perceivedLuminance(rgbFromHex(props.iconSvg.color))
          return (luminance < 0.5) ? 'white' : 'black'
        }
        return undefined
      })

      return {
        idCardOutline,

        tone,
      }
    },
  })
</script>

<style>
  .thumbnail {
    .logo-box {
      background-color: var(--ion-color-dark);

      .initial {
        color: var(--ion-color-dark-contrast);
      }
    }
  }

  .site,
  .username {
    @apply whitespace-nowrap overflow-hidden overflow-ellipsis;
  }
</style>
