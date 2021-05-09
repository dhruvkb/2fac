<template>
  <div class="github">
    <h2 class="font-bold text-3xl">GitHub integration<sup>*</sup></h2>
    <p class="mt-4">
      <em>This feature is still in development.</em>
    </p>
    <p class="mt-4">
      For very obvious reasons, your 2FA data should be in a private repository.
      You will need to authenticate Multifac with a personal access token to
      grant it access to that repo.
    </p>

    <input
      class="appearance-none font-mono text-sm px-2 h-8 w-full border border-gray-200 rounded-md focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 mt-4"
      v-model="accessToken"
      type="text"
      autocapitalize="off"
      autocomplete="off"
      spellcheck="false"
      placeholder="GitHub access token">
    <div class="output flex items-center mt-2">
      <button
        class="button text-blue-900 bg-blue-100 hover:bg-blue-200 focus:ring-blue-500"
        :disabled="!accessToken"
        @click="validateToken">
        Validate
      </button>
      <span
        v-if="outcome"
        class="ml-2"
        :class="outcome.isSuccessful ? 'text-green-600' : 'text-red-600'">
        {{ outcome.message }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Octokit } from '@octokit/rest'

  import { Outcome } from '@/models/outcome'

  export default defineComponent({
    name: 'GitHub',
    data() {
      return {
        outcome: null as Outcome<string> | null,
        accessToken: '',
      }
    },
    watch: {
      accessToken(toValue) {
        localStorage.setItem('access_token', toValue)
      },
    },
    methods: {
      async validateToken() {
        const octokit = new Octokit({ auth: this.accessToken })
        try {
          const { data: { login } } = await octokit.users.getAuthenticated()
          this.outcome = {
            isSuccessful: true,
            message: `Hello, ${login}!`,
            data: login,
          }
        } catch (ex) {
          this.outcome = {
            isSuccessful: false,
            message: ex.message,
          }
        }
      },
    },
    created() {
      this.accessToken = localStorage.getItem('access_token') ?? ''
    },
  })
</script>
