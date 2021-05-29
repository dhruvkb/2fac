<template>
  <div class="max-w-screen-tl mx-auto px-4-safe mt-4">
    <h2
      class="font-bold text-3xl"
      :class="headerClasses"
      ref="marker">
      Tokens
    </h2>

    <div class="flex items-center justify-between gap-16 mx-auto mt-2"> <!-- Action bar -->
      <InputField
        v-model="filterQuery"
        :wrapper-classes="['flex-grow']"
        icon-name="filter"
        placeholder="Filter by site or username"/>
      <teleport
        v-if="isMobile"
        to=".action-space.left">
        <div class="flex items-center">
          <ButtonControl @click="toggleEditMode">{{ isEditMode ? 'Done' : 'Edit' }}</ButtonControl>
        </div>
      </teleport>
      <teleport
        to=".action-space.right"
        :disabled="!isMobile">
        <div class="flex items-center">
          <ButtonControl @click="toggleAdd">Add</ButtonControl>
        </div>
      </teleport>
    </div>
  </div>

  <div class="page mt-4 mb-8" id="tokens">
    <Timeline v-show="false"/><!-- Tracks time and updates tokens -->

    <transition-group
      v-if="filteredAccounts.length"
      enter-from-class="opacity-0 transform translate-y-2"
      leave-active-class="absolute -z-1"
      name="list-complete"
      tag="div"
      class="grid tp:gap-4 grid-cols-1 tp:grid-cols-2 tl:grid-cols-3 dr:grid-cols-4 dw:grid-cols-6 tp:px-4-safe border-t border-b tp:border-none border-sep-l dark:border-sep-d mt-4 -space-y-px">
      <Account
        v-for="acc in filteredAccounts"
        :key="acc.uuid"
        class="list-complete-item transition-all ease-in-out duration-300"
        :account="acc"/>
    </transition-group>
    <div v-else class="text-center p-2 mt-4">
      It's a little lonely in here.
    </div>

    <Modal v-model:isVisible="isAdding">
      <template #modal-title>
        Add new account
      </template>
      <AddUpdate @add="toggleAdd"/>
    </Modal>
  </div>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    ref,
  } from 'vue'
  import { useStore } from 'vuex'

  import Modal from '@/components/Modal.vue'
  import InputField from '@/components/InputField.vue'
  import ButtonControl from '@/components/ButtonControl.vue'

  import Timeline from '@/tokens/Timeline.vue'
  import Account from '@/tokens/Account.vue'
  import AddUpdate from '@/tokens/AddUpdate.vue'

  import { Account as Acc } from '@/models/account'

  import { isMobile } from '@/plugins/responsive'
  import { intersection } from '@/plugins/intersection'

  export default defineComponent({
    name: 'Tokens',
    components: {
      ButtonControl,
      InputField,
      Modal,
      Timeline,
      Account,
      AddUpdate,
    },
    setup() {
      const store = useStore()
      store.commit('ui/setCurrentPage', { currentPage: 'Tokens' })

      const filterQuery = ref('')
      const filteredAccounts = computed(() => store.state.twoFa.accounts
        .filter((acc: Acc) => [
          acc.site?.toLocaleLowerCase(),
          acc.username?.toLocaleLowerCase(),
        ].some((attribute) => attribute?.includes(filterQuery.value.toLocaleLowerCase()))))

      const isAdding = ref(false)
      const toggleAdd = () => {
        isAdding.value = !isAdding.value
      }

      const isEditMode = computed(() => store.state.ui.tokens.isEditing)
      const toggleEditMode = () => {
        store.commit('ui/setIsEditing', { isEditing: !isEditMode.value })
      }

      const { marker, headerClasses } = intersection()

      return {
        isMobile: computed(isMobile),

        filterQuery,
        filteredAccounts,

        isAdding,
        toggleAdd,

        isEditMode,
        toggleEditMode,

        marker,
        headerClasses,
      }
    },
  })
</script>
