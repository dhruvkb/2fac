<template>
  <button
    class="flex items-center text-left p-2 border border-gray-200 hover:border-gray-500 focus:border-gray-500 rounded-md focus:outline-none overflow-hidden cursor-pointer"
    @click="copyOtp">
    <span class="flex items-center justify-center pr-2 border-r border-gray-200">
      <svg
        v-if="path"
        class="h-6 tp:h-8 w-6 tp:w-8 text-gray-600"
        viewBox="0 0 24 24">
        <path :d="path" fill="currentColor"/>
      </svg>
      <ion-icon
        v-else
        class="h-6 tp:h-8 w-6 tp:w-8 text-gray-300"
        name="key"/>
    </span>
    <span class="flex flex-col flex-grow pl-2">
      <span class="font-medium text-sm">{{ account.site }}</span>
      <span class="hidden tp:block text-sm text-gray-600 mb-2">{{ account.username }}</span>
      <span class="flex items-center">
        <span class="font-mono text-2xl">
          {{ firstThree }}<span class="ml-2"/>{{ lastThree }}
        </span>
        <ion-icon
          v-if="checkVisible"
          class="text-green-600 text-lg ml-2"
          name="checkmark-circle"/>
      </span>
    </span>
  </button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { Account } from '@/models/account'

  export default defineComponent({
    name: 'Card',
    props: {
      account: {
        type: Account,
        required: true,
      },
      isActive: {
        type: Boolean,
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
      copyOtp() {
        navigator.clipboard.writeText(this.account.currentOtp)
        if (this.checkTimer) {
          clearTimeout(this.checkTimer)
        }
        this.checkVisible = true
        this.checkTimer = setTimeout(() => {
          this.checkVisible = false
        }, 3000)
      },
    },
    async mounted() {
      await this.fetchIcon()
    },
  })
</script>
