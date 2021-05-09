<template>
  <div class="delete">
    <h2 class="font-bold text-red-600 text-3xl">Delete everything</h2>
    <p class="mt-4">
      All your data is stored locally within the browser, so cleaning your
      history and site data should remove your account information. However,
      you can also do the same using this handy button.
    </p>

    <div class="action mt-4">
      <button
        class="button text-red-900 bg-red-100 hover:bg-red-200"
        @click="clearData">
        Clear
      </button>
      <span
        v-if="outcome"
        class="ml-2 text-red-600">
        {{ outcome.message }}
      </span>
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
      }
    },
    methods: {
      clearData() {
        this.clearAccounts()
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
