<template>
  <div class="relative">
    <Card
      :site="account.site"
      :username="account.username"
      :icon-svg="iconSvg"
      :otp="account.currentOtp"/>

    <div class="hidden tp:block absolute top-2 right-2 z-10"><!-- Ellipsis menu -->
      <Menu as="div" class="relative text-left">
        <MenuButton
          class="p-1 border border-transparent hover:border-gray-200 rounded-md focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500">
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
            class="absolute z-10 right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
                <button
                  class="button justify-start"
                  :class="[ ...active ? ['bg-blue-200', 'text-blue-900'] : [] ]">
                  <Icon
                    class="h-4 w-4 mr-2"
                    name="pen"/>
                  Edit
                </button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button
                  class="button justify-start"
                  :class="[ ...active ? ['bg-red-200', 'text-red-900'] : [] ]"
                  @click="deleteAccount">
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
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapMutations } from 'vuex'
  import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  } from '@headlessui/vue'

  import Icon from '@/components/Icon.vue'

  import Card from '@/tokens/Card.vue'

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
      Icon,
      Card,
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
      }
    },
    methods: {
      deleteAccount() {
        this.removeAccount({
          slug: this.account.slug,
        })
      },
      ...mapMutations('twoFa', [
        'removeAccount',
      ]),
    },
    async mounted() {
      const { icon } = this.account
      if (!icon) {
        return
      }
      this.iconSvg = await getIcon(icon)
    },
  })
</script>
