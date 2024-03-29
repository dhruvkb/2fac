<template>
  <IonItemSliding>
    <IonItemOptions side="start">
      <IonItemOption @click="setModalVisible(true)">
        <IonIcon
          slot="icon-only"
          :ios="create"
          :md="createOutline" />
      </IonItemOption>
    </IonItemOptions>
    <IonItemOptions side="end">
      <IonItemOption
        color="danger"
        @click="openAlert">
        <IonIcon
          slot="icon-only"
          :ios="trash"
          :md="trashOutline" />
      </IonItemOption>
    </IonItemOptions>

    <Row
      :username="account.username"
      :site="account.site"
      :otp="account.currentOtp"
      :icon-svg="iconSvg" />

    <IonModal
      :is-open="isModalOpen"
      swipe-to-close
      @did-dismiss="setModalVisible(false)">
      <CreateUpdate
        :account="account"
        @close-modal="setModalVisible(false)" />
    </IonModal>
  </IonItemSliding>
</template>

<script lang="ts">
  import {
    defineComponent,
    onMounted,
    ref,
    watch,
  } from 'vue'

  import {
    IonIcon,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonModal,
  } from '@ionic/vue'
  import {
    create,
    createOutline,
    trash,
    trashOutline,
  } from 'ionicons/icons'

  import Row from '@/tokens/Row.vue'
  import CreateUpdate from '@/tokens/CreateUpdate.vue'

  import { modal } from '@/compositions/modal'
  import { alert } from '@/compositions/alert'

  import { Account } from '@/models/account'
  import type { IconSvg } from '@/models/icon_svg'

  import { getIcon } from '@/support/api'
  import { useTwoFac } from '@/stores/two_fac'

  const ionicComponents = {
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonIcon,
    IonModal,
  }
  export default defineComponent({
    name: 'Account',
    components: {
      ...ionicComponents,
      CreateUpdate,
      Row,
    },
    props: {
      account: {
        type: Account,
        required: true,
      },
    },
    setup(props) {
      const twoFacStore = useTwoFac()

      const { showDangerAlert } = alert()

      const iconSvg = ref<IconSvg | undefined>(undefined)
      const updateIcon = async () => {
        const { icon } = props.account
        if (icon) {
          iconSvg.value = await getIcon(icon)
        } else {
          iconSvg.value = undefined
        }
      }
      watch(() => props.account.icon, updateIcon)

      const deleteAccount = () => {
        twoFacStore.removeAccount(props.account.uuid)
      }
      const openAlert = () => {
        showDangerAlert(
          `Permanently delete ${props.account.site}?`,
          'You might lose access to the account if it is still protected by 2FA.',
          {
            text: 'Delete',
            handler: deleteAccount,
          },
        )
      }

      onMounted(() => {
        updateIcon()
      })

      return {
        create,
        createOutline,
        trash,
        trashOutline,

        iconSvg,

        openAlert,

        ...modal(),
      }
    },
  })
</script>
