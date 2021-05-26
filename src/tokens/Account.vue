<template>
  <div class="account relative max-w-full bg-gl-6 dark:bg-gd-5 tp:bg-tx overflow-hidden tp:overflow-visible">
    <div
      class="absolute inset-y-0 flex tp:hidden items-center gap-2 pl-4-safe transform transition-transform duration-300"
      :class="[...isEditMode ? ['translate-x-0'] : ['-translate-x-24']]">
      <ButtonControl
        class="bg-gl-5 dark:bg-gd-4 w-8 h-8 p-1 rounded-full"
        @click="toggleEdit">
        <Icon
          class="w-4 h-4"
          name="pencil-square"/>
      </ButtonControl>
      <ButtonControl
        class="bg-gl-5 dark:bg-gd-4 w-8 h-8 p-1 rounded-full"
        is-dangerous
        @click="toggleConfirmation">
        <Icon
          class="w-4 h-4"
          name="trash2"/>
      </ButtonControl>
    </div>

    <Card
      class="transition-transform duration-300"
      :class="[...isEditMode ? ['transform', 'translate-x-24'] : []]"
      :site="account.site"
      :username="account.username"
      :icon-svg="iconSvg"
      :otp="account.currentOtp"/>

    <div class="hidden tp:block absolute top-2 right-2 z-10"><!-- Ellipsis menu -->
      <Menu as="div" class="relative text-left">
        <MenuButton
          class="
            p-1
            border border-tx hover:border-sep-l dark:hover:border-sep-d rounded-md
            focus:outline-none focus-visible:ring-1 focus-visible:ring-bl dark:focus-visible:ring-bd">
          <Icon
            class="h-4 w-4"
            name="three-dots"/>
        </MenuButton>
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0">
          <MenuItems
            class="
              absolute z-10 right-0
              bg-gl-6 dark:bg-gd-5
              border border-sep-l dark:border-sep-d rounded-lg
              shadow-lg
              mt-2 origin-top-right
              focus:outline-none ring-1 ring-black ring-opacity-5">
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
                <button
                  class="flex items-center justify-start text-sm font-medium px-2 h-8 min-w-[8em] rounded"
                  :class="[...active ? ['bg-bl dark:bg-bd', 'text-white'] : []]"
                  @click="toggleEdit">
                  <Icon
                    class="h-4 w-4 mr-2"
                    name="pencil-square"/>
                  Edit
                </button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button
                  class="flex items-center justify-start text-sm font-medium px-2 h-8 min-w-[8em] rounded"
                  :class="[...active ? ['bg-rl dark:bg-rd', 'text-white'] : []]"
                  @click="toggleConfirmation">
                  <Icon
                    class="h-4 w-4 mr-2"
                    name="trash2"/>
                  Delete
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>

      <Modal v-model:isVisible="isEditing"><!-- Edit modal -->
        <template #modal-title>
          Edit {{ account.site }}
        </template>
        <Add
          :account="account"
          @edit="toggleEdit"/>
      </Modal>
    </div>

    <Modal v-model:isVisible="isConfirming"><!-- Delete confirmation -->
      <template #modal-title>
        Delete {{ account.site }}?
      </template>
      <div class="px-4">
        <p>
          This account will be permanently deleted. If 2FA is still enabled on
          the account, you may lose access to it if you don't have the recovery
          codes.
        </p>
        <div class="flex flex-row-reverse tp:flex-row items-center justify-between gap-2 mt-4">
          <ButtonControl @click="toggleConfirmation">
            Cancel
          </ButtonControl>
          <ButtonControl
            is-dangerous
            @click="deleteAccount">
            Delete
          </ButtonControl>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    ref,
  } from 'vue'
  import {
    mapMutations,
    useStore,
  } from 'vuex'
  import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  } from '@headlessui/vue'

  import Modal from '@/components/Modal.vue'
  import Icon from '@/components/Icon.vue'
  import ButtonControl from '@/components/ButtonControl.vue'

  import Card from '@/tokens/Card.vue'
  import Add from '@/tokens/Add.vue'

  import { Account } from '@/models/account'
  import { IconSvg } from '@/models/icon_svg'
  import { getIcon } from '@/support/simple_icons'

  export default defineComponent({
    name: 'Account',
    components: {
      Menu,
      MenuButton,
      MenuItems,
      MenuItem,
      Modal,
      Icon,
      ButtonControl,
      Card,
      Add,
    },
    props: {
      account: {
        type: Account,
        required: true,
      },
    },
    data() {
      return {
        iconSvg: null as IconSvg | null,
        isConfirming: false,
      }
    },
    watch: {
      'account.icon': function accountIcon() {
        this.updateIcon()
      },
    },
    methods: {
      async updateIcon() {
        const { icon } = this.account
        if (!icon) {
          return
        }
        this.iconSvg = await getIcon(icon)
      },
      toggleConfirmation() {
        this.isConfirming = !this.isConfirming
      },
      deleteAccount() {
        this.removeAccount({
          uuid: this.account.uuid,
        })
      },
      ...mapMutations('twoFa', [
        'removeAccount',
      ]),
    },
    async mounted() {
      await this.updateIcon()
    },
    setup() {
      const store = useStore()

      const isEditMode = computed(() => store.state.ui.tokens.isEditing)

      const isEditing = ref(false)
      const toggleEdit = () => {
        isEditing.value = !isEditing.value
      }

      return {
        isEditMode,

        isEditing,
        toggleEdit,
      }
    },
  })
</script>

<style scoped lang="css">
  .account:first-of-type {
    --mp-border-top: 0px;
  }

  .account:not(:first-of-type) {
    --mp-border-top: 1px;
  }
</style>
