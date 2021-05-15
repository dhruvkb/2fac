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

    <Modal v-model:isVisible="isConfirming">
      <DialogTitle
        as="h3"
        class="font-bold text-2xl text-red-600">
        Are you sure?
      </DialogTitle>
      <DialogDescription class="mt-4">
        All data will be permanently deleted. To use 2Fac, you will need to
        add accounts anew or import your data.
      </DialogDescription>
      <p class="mt-4">
        Do you want to delete?
      </p>
      <div class="flex items-center justify-end gap-2 mt-4">
        <button
          class="button bg-green-100 hover:bg-green-200 text-green-900 focus-visible:ring-green-500"
          @click="toggleConfirmation">
          Keep
        </button>
        <button
          class="button hover:bg-red-200 border-red-600 text-red-900 focus-visible:ring-red-500"
          @click="clearData">
          Delete
        </button>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapMutations } from 'vuex'
  import { DialogTitle, DialogDescription } from '@headlessui/vue'

  import Modal from '@/components/Modal.vue'

  import { Outcome } from '@/models/outcome'

  export default defineComponent({
    name: 'Delete',
    components: {
      DialogTitle,
      DialogDescription,
      Modal,
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
