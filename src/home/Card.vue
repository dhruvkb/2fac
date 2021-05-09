<template>
  <div
    class="card flex flex-row p-2 border rounded-md tp:rounded-md overflow-hidden transition-colors duration-500"
    @click="copyOtp">
    <div class="flex items-center justify-center mr-2 tp:mr-4">
      <svg
        v-if="path"
        class="h-6 tp:h-8 w-6 tp:w-8"
        viewBox="0 0 24 24">
        <path :d="path" :fill="color"/>
      </svg>
      <ion-icon
        v-else
        class="h-6 tp:h-8 w-6 tp:w-8"
        :style="{ color }"
        name="key"/>
    </div>
    <div
      class="flex-grow bg-white">
      <div class="font-medium">{{ account.site }}</div>
      <div class="hidden tp:block text-sm text-gray-600 mb-2">{{ account.username }}</div>
      <div class="flex items-center">
        <span class="font-mono">{{ account.currentOtp }}</span>
        <ion-icon
          v-if="checkVisible"
          class="text-green-600 ml-2"
          name="checkmark"/>
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
        apiRoot: 'https://multifac-server.vercel.app/api/icons/',
        color: '#000000',
        path: '' as (string | null),
        checkVisible: false,
        checkTimer: 0,
      }
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
