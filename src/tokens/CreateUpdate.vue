<template>
  <!-- Need to specify class `.ion-page` -->
  <IonPage class="ion-page dark-bg">
    <IonHeader class="rounded-t-lg">
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton
            color="danger"
            @click="closeModal">
            Cancel
          </IonButton>
        </IonButtons>
        <IonButtons slot="primary">
          <IonButton
            color="primary"
            :disabled="!attributes.secret"
            @click="saveAccount">
            Save
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen>
      <div class="opacity-60 text-sm pt-8 pb-2 ion-padding-horizontal">
        <div class="uppercase">
          Secret
          <IonText color="danger">
            *
          </IonText>
        </div>
        <p>A long string of letters and numbers, usually 16 or 32 characters.</p>
      </div>
      <IonList
        class="border-t"
        lines="full">
        <IonItem>
          <IonTextarea
            v-model="attributes.secret"
            class="font-mono"
            placeholder="Required"
            :disabled="Boolean(account)"
            required />
        </IonItem>
        <IonItem
          v-if="Boolean(account)"
          class="text-center"
          :detail="false"
          button
          @click="copySecret">
          <IonLabel>Copy secret</IonLabel>
        </IonItem>
      </IonList>

      <div class="opacity-60 text-sm pt-8 pb-2 ion-padding-horizontal">
        <div class="uppercase">
          Account Info
        </div>
      </div>
      <IonList
        class="border-t"
        lines="full">
        <IonItem>
          <IonLabel :position="isPlatform('ios') ? 'fixed' : 'floating'">
            Site
          </IonLabel>
          <IonInput
            v-model="attributes.site"
            placeholder="Optional" />
        </IonItem>
        <IonItem>
          <IonLabel :position="isPlatform('ios') ? 'fixed' : 'floating'">
            Username
          </IonLabel>
          <IonInput
            v-model="attributes.username"
            placeholder="Optional" />
        </IonItem>
      </IonList>

      <div class="opacity-60 text-sm pt-8 pb-2 ion-padding-horizontal">
        <div class="uppercase">
          Icon
        </div>
        <p>
          Use SVG names from
          <a
            class="underline"
            href="https://simpleicons.org/">
            Simple Icons</a>.
        </p>
      </div>
      <IonList
        class="border-t"
        lines="full">
        <IonItem>
          <IonLabel :position="isPlatform('ios') ? 'fixed' : 'floating'">
            Icon
          </IonLabel>
          <IonInput
            v-model="attributes.icon"
            placeholder="Optional" />
        </IonItem>
      </IonList>

      <div class="opacity-60 text-sm pt-8 pb-2 ion-padding-horizontal">
        <div class="uppercase">
          Preview
        </div>
      </div>
      <IonList
        class="border-t"
        lines="full">
        <Row
          :site="attributes.site"
          :username="attributes.username"
          :icon-svg="iconSvg"
          :otp="otp">
          <template
            v-if="!attributes.site"
            #site>
            <span class="opacity-50">Site</span>
          </template>
          <template
            v-if="!attributes.username"
            #username>
            <span class="opacity-50">username@site</span>
          </template>
        </Row>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    onMounted,
    reactive,
    ref,
    watch,
  } from 'vue'

  import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonText,
    IonTextarea,
    IonToolbar,
    isPlatform,
  } from '@ionic/vue'

  import { debounce } from '@/support/dash'
  import { TOTP } from 'otpauth'

  import Row from '@/tokens/Row.vue'

  import { toast } from '@/compositions/toast'

  import { Account } from '@/models/account'
  import type { IconSvg } from '@/models/icon_svg'

  import { useTwoFac } from '@/stores/two_fac'
  import { getIcon } from '@/support/api'

  export default defineComponent({
    name: 'CreateUpdate',
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonButtons,
      IonButton,
      IonContent,
      IonText,
      IonList,
      IonItem,
      IonTextarea,
      IonLabel,
      IonInput,
      Row,
    },
    props: {
      account: {
        type: Account,
        default: undefined,
      },
    },
    emits: ['closeModal'],
    setup(props, { emit }) {
      const twoFacStore = useTwoFac()

      const title = computed(() => (props.account ? `Edit ${props.account.site}` : 'Add new account'))

      const attributes = reactive({
        secret: '',
        site: '' as string | undefined,
        username: '' as string | undefined,
        icon: '' as string | undefined,
      })

      const { showToast } = toast()
      const copySecret = () => {
        if (isSecureContext) {
          navigator.clipboard.writeText(attributes.secret)
          showToast('🤫 Copied secret to clipboard!')
        } else {
          showToast('😭 Could not copy secret.')
        }
      }

      const iconSvg = ref<IconSvg | undefined>(undefined)
      const updateIcon = async () => {
        const { icon } = attributes
        if (icon) {
          iconSvg.value = await getIcon(icon)
        } else {
          iconSvg.value = undefined
        }
      }
      const updateIconDebounced = debounce(() => {
        updateIcon()
      }, 1000)
      watch(() => attributes.icon, updateIconDebounced)

      const otp = ref('')
      const totp = computed(() => {
        const { secret } = attributes
        if (secret) {
          return new TOTP({ secret: secret.replaceAll(/\s+/g, '') })
        }
        return null
      })
      const refreshOtp = () => {
        if (totp.value) {
          otp.value = totp.value.generate()
        } else {
          otp.value = ''
        }
      }
      watch(() => attributes.secret, refreshOtp)
      twoFacStore.$onAction(({ name }) => {
        if (name === 'updateAccounts') refreshOtp()
      })

      onMounted(() => {
        if (props.account) {
          const { pojo } = props.account
          attributes.secret = pojo.secret
          attributes.site = pojo.site
          attributes.username = pojo.username
          attributes.icon = pojo.icon
        }
      })
      const closeModal = () => {
        emit('closeModal')
      }
      const saveAccount = () => {
        if (props.account) {
          twoFacStore.updateAccount(props.account.uuid, attributes)
        } else {
          twoFacStore.addAccount(Account.fromPojo(attributes))
        }
        closeModal()
      }

      return {
        isPlatform,

        title,

        attributes,
        iconSvg,
        otp,

        copySecret,
        closeModal,
        saveAccount,
      }
    },
  })
</script>
