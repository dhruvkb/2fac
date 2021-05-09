<template>
  <div class="card flex flex-row p-2 border rounded-md tp:rounded-md overflow-hidden transition-colors duration-500">
    <div class="flex items-center justify-center mr-2 tp:mr-4">
      <svg
        v-if="path"
        class="h-6 tp:h-9 w-6 tp:w-9"
        viewBox="0 0 24 24">
        <path :d="path" :fill="color"/>
      </svg>
      <ion-icon
        v-else
        class="h-6 tp:h-9 w-6 tp:w-9"
        :style="{ color }"
        name="key"/>
    </div>
    <div
      class="flex-grow bg-white">
      <p class="font-semibold">{{ account.site }}</p>
      <p class="hidden tp:block text-sm text-gray-600 mb-2">{{ account.username }}</p>
      <p class="font-mono">{{ account.currentOtp }}</p>
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
    },
    async mounted() {
      await this.fetchIcon()
    },
  })
</script>
