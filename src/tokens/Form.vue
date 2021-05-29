<template>
  <div>
    <form class="px-4">
      <InputField
        class="font-mono"
        icon-name="key"
        label="Secret:"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        placeholder="Secret"
        :model-value="secret"
        is-required
        :disabled="lockSecret"
        @update:model-value="value => handleUpdate('secret', value)"/>
      <div class="grid grid-cols-2 gap-2 mt-2">
        <InputField
          icon-name="globe"
          label="Site:"
          spellcheck="false"
          placeholder="Site"
          :model-value="site"
          is-required
          @update:model-value="value => handleUpdate('site', value)"/>
        <InputField
          icon-name="person"
          label="Username:"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          placeholder="Username"
          :model-value="username"
          @update:model-value="value => handleUpdate('username', value)"/>
      </div>
      <div class="flex items-end gap-4 mt-2">
        <InputField
          :wrapper-classes="['flex-grow']"
          icon-name="app"
          label="Icon:"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          placeholder="Icon"
          :model-value="icon"
          @update:model-value="value => handleUpdate('icon', value)"/>
      </div>
      <p class="mt-2 text-xs">
        Please use SVG names from
        <a
          class="underline"
          href="https://simpleicons.org"
          target="_blank">Simple Icons</a>.
      </p>
    </form>
    <div class="border-t border-b tp:border-none border-sep-l dark:border-sep-d mt-4 tp:px-4">
      <Card
        class="card"
        :site="site"
        :username="username"
        :icon-svg="iconSvg"
        :otp="otp"/>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
  } from 'vue'
  import { useStore } from 'vuex'
  import { TOTP } from 'otpauth'
  import debounce from 'lodash/debounce'

  import InputField from '@/components/InputField.vue'

  import Card from '@/tokens/Card.vue'

  import { IconSvg } from '@/models/icon_svg'

  import { getIcon } from '@/support/simple_icons'

  export default defineComponent({
    name: 'Form',
    components: {
      Card,
      InputField,
    },
    props: {
      secret: {
        type: String,
      },
      site: {
        type: String,
      },
      username: {
        type: String,
      },
      icon: {
        type: String,
      },
      lockSecret: {
        type: Boolean,
      },
    },
    setup(props, { emit }) {
      const store = useStore()

      const totp = computed(() => {
        if (props.secret) {
          return new TOTP({ secret: props.secret.replaceAll(' ', '') })
        }
        return null
      })

      const iconSvg = ref(null as IconSvg | null)
      const handleGetIcon = async () => {
        if (props.icon) {
          iconSvg.value = await getIcon(props.icon)
        } else {
          iconSvg.value = null
        }
      }
      const handleGetIconDebounced = debounce(() => {
        nextTick(handleGetIcon)
      }, 1000)

      const otp = ref(null as string | null)
      const handleRefreshOtp = () => {
        otp.value = totp.value?.generate() ?? null
      }

      const handleUpdate = (field: string, value: unknown) => {
        console.log(field, value)
        emit(`update:${field}`, value)
        if (field === 'secret') {
          nextTick(handleRefreshOtp)
        }
        if (field === 'icon') {
          handleGetIconDebounced()
        }
      }

      let unsubscribe: () => void
      onMounted(() => {
        unsubscribe = store.subscribe((mutation: { type: string }) => {
          if (mutation.type === 'twoFa/updateAccounts') {
            handleRefreshOtp()
          }
        })
        nextTick(handleGetIcon)
        nextTick(handleRefreshOtp)
      })
      onBeforeUnmount(() => {
        if (unsubscribe) {
          unsubscribe()
        }
      })

      return {
        iconSvg,
        otp,

        handleUpdate,
      }
    },
  })
</script>

<style scoped lang="css">
  .card {
    --mp-border-top: 0px;
  }
</style>
