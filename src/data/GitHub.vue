<template>
  <div class="github">
    <h3 class="font-bold text-2xl">GitHub integration</h3>
    <p class="mt-4">
      For very obvious reasons, your 2FA data should be in a private repository.
      You will need to authenticate 2Fac with a personal access token to
      grant it access to that repo.
    </p>

    <label class="block font-medium mt-4">
      <span class="text-sm">GitHub access token:</span>
      <div class="relative flex items-center">
        <Icon
          class="absolute left-2"
          name="key"/>
        <input
          v-model="accessToken"
          class="input font-mono w-full pl-8"
          id="access-token"
          type="text"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          placeholder="GitHub access token">
      </div>
    </label>
    <div class="output flex items-center mt-2">
      <button
        class="button text-blue-900 bg-blue-100 hover:bg-blue-200 focus:ring-blue-500"
        :disabled="!accessToken"
        @click="validateToken">
        Log in
      </button>
      <span
        v-if="loginOutcome"
        class="ml-2"
        :class="loginOutcome.isSuccessful ? 'text-green-600' : 'text-red-600'">
        {{ loginOutcome.message }}
      </span>
    </div>

    <div class="grid tl:grid-cols-2 gap-2 mt-4">
      <div class="tl:pr-2">
        <h4 class="font-bold text-xl">Import</h4>
        <p class="mt-4" v-if="username">
          Will read
          <code class="text-sm bg-gray-100 p-1 rounded-md">{{ fileName }}</code>
          from
          <code class="text-sm bg-gray-100 p-1 rounded-md">{{ username }}/{{ repoName }}</code>.
        </p>
        <div class="action mt-4">
          <button
            class="button text-blue-900 bg-blue-100 hover:bg-blue-200 focus:ring-blue-500"
            :disabled="!username"
            @click="readFromGitHub">
            Import
          </button>
          <span
            v-if="readOutcome"
            class="ml-2"
            :class="readOutcome.isSuccessful ? 'text-green-600' : 'text-red-600'">
            {{ readOutcome.message }}
          </span>
        </div>
      </div>

      <div class="tl:pl-2 tl:border-l border-gray-200">
        <h4 class="font-bold text-xl">Export</h4>
        <p class="mt-4" v-if="username">
          Will write
          <code class="text-sm bg-gray-100 p-1 rounded-md">{{ fileName }}</code>
          to
          <code class="text-sm bg-gray-100 p-1 rounded-md">{{ username }}/{{ repoName }}</code>.
        </p>
        <div class="action mt-4">
          <button
            class="button text-blue-900 bg-blue-100 hover:bg-blue-200 focus:ring-blue-500"
            :disabled="!username"
            @click="writeToGitHub">
            Export
          </button>
          <span
            v-if="writeOutcome"
            class="ml-2"
            :class="writeOutcome.isSuccessful ? 'text-green-600' : 'text-red-600'">
            {{ writeOutcome.message }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import { Octokit } from '@octokit/rest'

  import Icon from '@/components/Icon.vue'

  import { Outcome } from '@/models/outcome'
  import { AccountInterface } from '@/models/account'

  import {
    createNewBranch,
    getBranchSha,
    getDefaultBranch,
    getFile,
    updateFile,
  } from '@/support/github'

  export default defineComponent({
    name: 'GitHub',
    components: {
      Icon,
    },
    data() {
      return {
        repoName: '2fa-secrets',
        fileName: 'secrets.json',
        octokit: null as Octokit | null,
        accessToken: '',
        loginOutcome: null as Outcome<string> | null,
        readOutcome: null as Outcome<AccountInterface[]> | null,
        writeOutcome: null as Outcome<never> | null,
      }
    },
    watch: {
      accessToken(toValue, fromValue) {
        if (toValue !== fromValue) {
          this.octokit = null
          this.loginOutcome = null
          localStorage.setItem('access_token', toValue)
        }
      },
    },
    computed: {
      client(): Octokit {
        return this.octokit ?? new Octokit({ auth: this.accessToken })
      },
      username(): string | undefined {
        return this.loginOutcome?.data
      },
      ...mapGetters('twoFa', [
        'accountsJson',
      ]),
    },
    methods: {
      async validateToken() {
        const octokit = this.client
        try {
          const { data: { login: username } } = await octokit.users.getAuthenticated()
          this.loginOutcome = {
            isSuccessful: true,
            message: `Hello, ${username}!`,
            data: username,
          }
        } catch (ex) {
          this.loginOutcome = {
            isSuccessful: false,
            message: ex.message,
          }
        }
      },
      async readFromGitHub() {
        if (!this.username) {
          return
        }

        const octokit = this.client
        let outcome: Outcome<AccountInterface[]>
        try {
          const defaultBranch = await getDefaultBranch(octokit, this.username, this.repoName)
          const file = await getFile(octokit, this.username, this.repoName, this.fileName, defaultBranch)

          if (!file.content) {
            throw new Error('Content missing')
          }
          const accPojos = JSON.parse(file.content)
          this.clearAccounts()
          this.loadAccounts({ accPojos })
          outcome = {
            isSuccessful: true,
            message: 'Great success!',
            data: accPojos,
          }
        } catch (ex) {
          outcome = {
            isSuccessful: false,
            message: ex.message,
          }
        }
        this.readOutcome = outcome
      },
      async writeToGitHub() {
        if (!this.username) { return }

        const octokit = this.client
        let outcome: Outcome<never>
        try {
          const defaultBranch = await getDefaultBranch(octokit, this.username, this.repoName)
          const branchSha = await getBranchSha(octokit, this.username, this.repoName, defaultBranch)
          const newBranch = Date.now().toString()
          await createNewBranch(octokit, this.username, this.repoName, newBranch, branchSha)
          const file = await getFile(octokit, this.username, this.repoName, this.fileName, newBranch)
          if (!file.sha) {
            throw new Error('Missing SHA')
          }
          if (file.content === this.accountsJson) {
            outcome = {
              isSuccessful: true,
              message: 'Contents are identical.',
            }
            this.writeOutcome = outcome
            return
          }
          await updateFile(octokit, this.username, this.repoName, newBranch, this.fileName, this.accountsJson, file.sha)

          outcome = {
            isSuccessful: true,
            message: `Pushed to branch ${newBranch}`,
          }
        } catch (ex) {
          outcome = {
            isSuccessful: false,
            message: ex.message,
          }
        }
        this.writeOutcome = outcome
      },
      ...mapMutations('twoFa', [
        'clearAccounts',
        'loadAccounts',
      ]),
    },
    created() {
      this.accessToken = localStorage.getItem('access_token') ?? ''
    },
    beforeUnmount() {
      localStorage.setItem('access_token', this.accessToken)
    },
  })
</script>
