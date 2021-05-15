<template>
  <Timeline class="sticky top-[53px]"/>

  <div class="page my-8" id="tokens">
    <div class="max-w-screen-tl mx-auto px-4-safe">
      <h2 class="font-bold text-3xl">Tokens</h2>

      <div class="flex items-center justify-between gap-16 mx-auto mt-4"> <!-- Action bar -->
        <div class="flex-grow relative flex items-center max-w-screen-mp">
          <Icon
            class="absolute left-2 h-4 w-4"
            name="filter"/>
          <input
            v-model="filterQuery"
            class="input w-full pl-8"
            type="text"
            placeholder="Filter"/>
        </div>
        <teleport
          to=".action-space"
          :disabled="!isMobile">
          <div class="flex items-center gap-2">
            <button
              class="button tp:hidden text-blue-900 bg-blue-100 hover:bg-blue-200 focus-visible:ring-blue-500">
              Edit
            </button>
            <button
              class="button text-green-900 bg-green-100 hover:bg-green-200 focus-visible:ring-green-500">
              Add
            </button>
          </div>
        </teleport>
      </div>
    </div>

    <transition-group
      v-if="filteredAccounts.length"
      enter-from-class="opacity-0 transform translate-y-2"
      leave-active-class="absolute -z-1"
      name="list-complete"
      tag="div"
      class="grid tp:gap-4 grid-cols-1 tp:grid-cols-2 tl:grid-cols-3 dr:grid-cols-4 dw:grid-cols-6 tp:px-4-safe mt-4 -space-y-px">
      <Card
        v-for="acc in filteredAccounts"
        :key="acc.slug"
        class="list-complete-item transition-all ease-in-out duration-300"
        :account="acc"/>
    </transition-group>
    <div v-else class="text-center p-2 mt-4">
      It's a little lonely in here.
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from 'vue'
  import { useStore } from 'vuex'

  import Icon from '@/components/Icon.vue'

  import Timeline from '@/tokens/Timeline.vue'
  import Card from '@/tokens/Card.vue'

  import { Account } from '@/models/account'

  import { isMobile } from '@/plugins/responsive'

  export default defineComponent({
    name: 'Tokens',
    components: {
      Icon,
      Timeline,
      Card,
    },
    setup() {
      const store = useStore()

      const filterQuery = ref('')
      const filteredAccounts = computed(() => store.state.twoFa.accounts
        .filter((acc: Account) => [
          acc.site?.toLocaleLowerCase(),
          acc.username?.toLocaleLowerCase(),
        ].some((attribute) => attribute?.includes(filterQuery.value.toLocaleLowerCase()))))
      return {
        isMobile: computed(isMobile),

        filterQuery,
        filteredAccounts,
      }
    },
  })
</script>
