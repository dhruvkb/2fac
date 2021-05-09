<template>
  <div class="delete">
    <h2 class="font-bold text-red-600 text-3xl">Delete everything</h2>
    <p class="mt-4">
      All your data is stored locally within the browser, so cleaning your
      history and site data should remove your account information. However,
      you can also do the same using this handy button.
    </p>

    <div class="action flex items-center mt-4">
      <button
        class="button"
        :class="clearButtonClasses"
        @click="toggleConfirmation">
        {{ isConfirming ? 'Cancel' : 'Clear' }}
      </button>
      <span
        v-if="outcome"
        class="ml-2 text-red-600">
        {{ outcome.message }}
      </span>
      <button
        v-if="isConfirming"
        class="button text-red-900 bg-red-100 hover:bg-red-200 focus:ring-red-500 ml-auto"
        @click="clearData">
        Delete
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapMutations } from 'vuex'

  import { Outcome } from '@/models/outcome'

  export default defineComponent({
    name: 'Delete',
    data() {
      return {
        outcome: null as Outcome<string> | null,
        isConfirming: false,
      }
    },
    computed: {
      clearButtonClasses() {
        if (this.isConfirming) {
          return ['text-green-900', 'bg-green-100', 'hover:bg-green-200', 'focus:ring-green-500']
        }
        return ['text-red-900', 'bg-red-100', 'hover:bg-red-200', 'focus:ring-red-500']
      },
    },
    methods: {
      toggleConfirmation() {
        this.isConfirming = !this.isConfirming
      },
      clearData() {
        this.clearAccounts()
        this.toggleConfirmation()
        this.outcome = {
          isSuccessful: true,
          message: 'Gone!',
        }
      },
      ...mapMutations('twoFa', [
        'clearAccounts',
      ]),
    },
  })
</script>
