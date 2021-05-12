<template>
  <div class="delete">
    <h3 class="font-bold text-red-600 text-2xl">Delete everything</h3>
    <p class="mt-4">
      All your data is stored locally within the browser, so cleaning your
      history and site data should remove your account information. However,
      you can also do the same using this handy button.
    </p>

    <div class="action flex items-center mt-4">
      <button
        class="button bg-red-100 hover:bg-red-200 text-red-900 focus-visible:ring-red-500"
        @click="toggleConfirmation">
        Delete
      </button>
      <span
        v-if="outcome"
        class="ml-2 text-red-600">
        {{ outcome.message }}
      </span>
    </div>

    <TransitionRoot appear :show="isConfirming" as="template">
      <Dialog as="div" @close="toggleConfirmation" open>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex items-center justify-center min-h-screen">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-300 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0">
              <DialogOverlay class="fixed inset-0 bg-black opacity-50"/>
            </TransitionChild>

            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-300 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95">
              <div
                class="inline-block w-full max-w-screen-mp p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <DialogTitle
                  as="h3"
                  class="font-bold text-2xl text-red-600">
                  Are you sure?
                </DialogTitle>
                <p class="mt-4">
                  All data will be permanently lost. To use 2Fac, you will need
                  to add new accounts or import your data.
                </p>
                <p class="mt-4">
                  Do you want to delete?
                </p>
                <div class="flex items-center justify-between mt-4">
                  <button
                    class="button bg-green-100 hover:bg-green-200 text-green-900 focus-visible:ring-green-500"
                    @click="toggleConfirmation">
                    Keep
                  </button>
                  <button
                    class="button bg-red-100 hover:bg-red-200 text-red-900 focus-visible:ring-red-500"
                    @click="clearData">
                    Delete
                  </button>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapMutations } from 'vuex'
  import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue'

  import { Outcome } from '@/models/outcome'

  export default defineComponent({
    name: 'Delete',
    components: {
      Dialog,
      DialogOverlay,
      DialogTitle,
      TransitionRoot,
      TransitionChild,
    },
    data() {
      return {
        outcome: null as Outcome<string> | null,
        isConfirming: false,
      }
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
