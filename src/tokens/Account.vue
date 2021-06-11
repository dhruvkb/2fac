<template>
  <IonItemSliding>
    <IonItemOptions side="start">
      <IonItemOption @click="setModalVisible(true)">
        <IonIcon
          slot="icon-only"
          :ios="create"
          :md="createOutline"/>
      </IonItemOption>
    </IonItemOptions>
    <IonItemOptions side="end">
      <IonItemOption
        color="danger"
        @click="openAlert">
        <IonIcon
          slot="icon-only"
          :ios="trash"
          :md="trashOutline"/>
      </IonItemOption>
    </IonItemOptions>

    <Row
      :username="account.username"
      :site="account.site"
      :otp="account.currentOtp"
      :icon-svg="iconSvg"/>

    <IonModal
      :is-open="isModalOpen"
      swipe-to-close
      @didDismiss="setModalVisible(false)">
      <CreateUpdate
        :account="account"
        @closeModal="setModalVisible(false)"/>
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
  import { useStore } from 'vuex'

  import {
    alertController,
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

  import { Account } from '@/models/account'
  import { IconSvg } from '@/models/icon_svg'

  import { getIcon } from '@/support/simple_icons'

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
      const store = useStore()

      const iconSvg = ref<IconSvg | null>(null)
      const updateIcon = async () => {
        const { icon } = props.account
        if (icon) {
          iconSvg.value = await getIcon(icon)
        } else {
          iconSvg.value = null
        }
      }
      watch(() => props.account.icon, updateIcon)

      const deleteAccount = () => {
        store.commit('twoFa/removeAccount', {
          uuid: props.account.uuid,
        })
      }
      const openAlert = async () => {
        const alert = await alertController
          .create({
            cssClass: 'alert-controller',
            header: `Permanently delete ${props.account.site}?`,
            message: 'You might lose access to the account if it is still protected by 2FA.',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
              },
              {
                cssClass: 'delete-button',
                text: 'Delete',
                handler: deleteAccount,
              },
            ],
          })
        return alert.present()
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

<style lang="css">
  .alert-controller .delete-button {
    color: var(--ion-color-danger);
  }
</style>
