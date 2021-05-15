<template>
  <div
    class="relative flex items-center bg-white px-4-safe tp:px-2 py-2 border-t border-b tp:border-l tp:border-r border-gray-200 tp:rounded-md tp:shadow-sm">
    <div class="flex items-center justify-center pr-2 border-r border-gray-200"><!-- Site icon -->
      <svg
        v-if="path"
        class="h-8 w-8 text-gray-600"
        viewBox="0 0 24 24">
        <path :d="path" :fill="color"/>
      </svg>
      <Icon
        v-else
        class="h-8 w-8 text-gray-300"
        name="person-badge"/>
    </div>

    <div class="flex-grow flex flex-col pl-2 min-w-0"><!-- Account info -->
      <div class="font-medium text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">{{ account.site }}</div>
      <div class="text-sm text-gray-600 whitespace-nowrap overflow-hidden overflow-ellipsis">{{ account.username }}</div>
      <Otp
        class="hidden tp:flex mt-2"
        :otp="account.currentOtp"/>
    </div>

    <div class="flex items-center tp:hidden">
      <Otp :otp="account.currentOtp"/>
    </div>

    <div class="hidden tp:block absolute top-2 right-2"><!-- Ellipsis menu -->
      <Menu as="div" class="relative text-left">
        <MenuButton class="p-1 border border-transparent hover:border-gray-200 rounded-md focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500">
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
          <MenuItems class="absolute z-10 right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
                <button class="button justify-start" :class="[ ...active ? ['bg-blue-200', 'text-blue-900'] : [] ]">
                  <Icon
                    class="h-4 w-4 mr-2"
                    name="pen"/>
                  Edit
                </button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button class="button justify-start" :class="[ ...active ? ['bg-red-200', 'text-red-900'] : [] ]">
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
  import {
    defineComponent,
  } from 'vue'
  import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  } from '@headlessui/vue'

  import Icon from '@/components/Icon.vue'
  import Otp from '@/tokens/Otp.vue'

  import { Account } from '@/models/account'

  export default defineComponent({
    name: 'Card',
    components: {
      Menu,
      MenuButton,
      MenuItems,
      MenuItem,
      Icon,
      Otp,
    },
    props: {
      account: {
        type: Account,
        required: true,
      },
    },
    data() {
      return {
        apiRoot: 'https://2fac-api.vercel.app/api/icons/',
        color: '#000000',
        path: '' as (string | null),
        checkVisible: false,
        checkTimer: 0,
      }
    },
    computed: {
      firstThree(): string {
        return this.account.currentOtp.slice(0, 3)
      },
      lastThree(): string {
        return this.account.currentOtp.slice(3)
      },
    },
    methods: {
      async fetchIcon() {
        const res = await fetch(`${this.apiRoot}${this.account.icon}`)
        const data = await res.json()
        if (res.ok) {
          this.color = data.color
          this.path = data.path
        }
      },
    },
    async mounted() {
      await this.fetchIcon()
    },
  })
</script>
