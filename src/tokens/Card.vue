<template>
  <div
    class="relative flex items-center text-left bg-white p-2 border border-gray-200 rounded-md shadow-sm">
    <div class="flex items-center justify-center pr-2 border-r border-gray-200"><!-- Site icon -->
      <svg
        v-if="path"
        class="h-8 w-8 text-gray-600"
        viewBox="0 0 24 24">
        <path :d="path" :fill="color"/>
      </svg>
      <ion-icon
        v-else
        class="h-8 w-8 text-gray-300"
        name="key"/>
    </div>
    <div class="flex flex-col flex-grow pl-2">
      <div class="font-medium text-sm">{{ account.site }}</div>
      <div class="hidden tp:block text-sm text-gray-600 mb-2">{{ account.username }}</div>
      <div class="flex items-center">
        <button
          class="font-mono text-2xl hover:underline focus:outline-none focus-visible:underline"
          @click="copyOtp">
          {{ firstThree }}<span class="text-gray-300 -mx-1 select-none">·</span>{{ lastThree }}
        </button>
        <div
          class="ml-2 transform transition duration-300"
          :class="{ 'opacity-0': !checkVisible, '-translate-x-2': !checkVisible }">
          <ion-icon
            class="block text-green-600 text-lg"
            name="copy-outline"/>
        </div>
      </div>
    </div>
  </div>
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
