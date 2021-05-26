<template>
  <div class="delete">
    <h3 class="font-bold text-rl dark:text-rd text-2xl">Delete everything</h3>
    <p class="mt-4">
      All your data is stored locally within the browser, so cleaning your
      history and site data should remove your account information. However,
      you can also do the same using this handy button.
    </p>

    <div class="action flex items-center mt-4">
      <ButtonControl
        is-dangerous
        @click="toggleConfirmation">
        Purge
      </ButtonControl>
      <span
        v-if="outcome"
        class="ml-2 text-rl dark:text-rd">
        {{ outcome.message }}
      </span>
    </div>

    <Modal v-model:isVisible="isConfirming">
      <template #modal-title>
        Purge all data?
      </template>
      <div class="px-4">
        <DialogDescription>
          All data will be permanently deleted. To use 2Fac, you will need to
          add accounts anew or import your data.
        </DialogDescription>
        <div class="flex flex-row-reverse tp:flex-row items-center justify-between gap-2 mt-4">
          <ButtonControl @click="toggleConfirmation">
            Cancel
          </ButtonControl>
          <ButtonControl
            is-dangerous
            @click="clearData">
            Purge
          </ButtonControl>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapMutations } from 'vuex'
  import { DialogDescription } from '@headlessui/vue'

  import Modal from '@/components/Modal.vue'
  import ButtonControl from '@/components/ButtonControl.vue'

  import { Outcome } from '@/models/outcome'

  export default defineComponent({
    name: 'Delete',
    components: {
      ButtonControl,
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
