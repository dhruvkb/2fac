<template>
  <IonPage>
    <IonHeader
      v-if="isPlatform('ios')"
      translucent>
      <IonToolbar>
        <IonButtons slot="primary">
          <IonButton
            color="brand"
            @click="setModalVisible(true)">
            <IonIcon
              slot="icon-only"
              :icon="addOutline"/>
          </IonButton>
        </IonButtons>
        <IonTitle>Tokens</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen>
      <IonHeader
        v-if="isPlatform('ios')"
        collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Tokens</IonTitle>
        </IonToolbar>

        <IonToolbar>
          <IonSearchbar
            v-model="filterQuery"
            inputmode="search"
            :searchIcon="filterOutline"
            placeholder="Filter accounts"/>
        </IonToolbar>
      </IonHeader>

      <div
        v-else
        class="search-container px-2"><!-- px-2 to align with the list below -->
        <IonSearchbar
          v-model="filterQuery"
          inputmode="search"
          :searchIcon="filterOutline"
          placeholder="Filter accounts"/>
      </div>

      <div ref="marker"/>
      <Timeline/>

      <IonList
        v-if="accounts.length"
        :lines="isPlatform('ios') ? 'inset' : 'none'">
        <Account
          v-for="acc in accounts"
          :key="acc.uuid"
          :account="acc"/>
      </IonList>
      <div
        v-else
        class="flex flex-col gap-4 items-center mt-16">
        <img
          class="h-32"
          src="@/assets/illustrations/blank.png"
          alt="Empty balloons in space"/>
        <div class="text-center">
          It's a bit empty in here.<br/>
          Add some accounts to get started.
        </div>
      </div>
    </IonContent>

    <IonFab
      v-if="!isPlatform('ios')"
      vertical="bottom"
      horizontal="end"
      slot="fixed">
      <IonButton
        class="fab normal-case h-14 min-w-14"
        :class="[...isIntersecting ? [] : ['collapsed']]"
        @click="setModalVisible(true)">
        <IonIcon class="icon" :icon="addOutline"/>
        <span class="label max-w-24 overflow-hidden transition-max-w duration-300">Add account</span>
      </IonButton>
    </IonFab>

    <IonModal
      :is-open="isModalOpen"
      swipe-to-close
      @didDismiss="setModalVisible(false)">
      <CreateUpdate @closeModal="setModalVisible(false)"/>
    </IonModal>
  </IonPage>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    onMounted,
    ref,
  } from 'vue'
  import { useStore } from 'vuex'

  import {
    IonButton,
    IonButtons,
    IonContent,
    IonFab,
    IonHeader,
    IonIcon,
    IonList,
    IonModal,
    IonPage,
    IonSearchbar,
    IonTitle,
    IonToolbar,
    isPlatform,
  } from '@ionic/vue'
  import {
    addOutline,
    filterOutline,
  } from 'ionicons/icons'

  import Timeline from '@/tokens/Timeline.vue'
  import Account from '@/tokens/Account.vue'
  import CreateUpdate from '@/tokens/CreateUpdate.vue'

  import { modal } from '@/compositions/modal'
  import { intersection } from '@/compositions/intersection'

  import { Account as Acc } from '@/models/account'

  const ionicComponents = {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonList,
    IonFab,
    IonModal,
  }
  export default defineComponent({
    name: 'Tokens',
    components: {
      ...ionicComponents,
      CreateUpdate,
      Account,
      Timeline,
    },
    setup() {
      const store = useStore()

      const filterQuery = ref('')
      const accounts = computed(() => store.state.twoFa.accounts
        .filter((acc: Acc) => [acc.site, acc.username]
          .map((attr) => attr?.toLocaleLowerCase())
          .some((attr) => attr?.includes(filterQuery.value.toLocaleLowerCase()))))

      // Intersection composition
      const marker = ref<HTMLElement | null>(null)
      const { isIntersecting, observer } = intersection({ threshold: 1 })
      onMounted(() => {
        if (marker.value) {
          observer.observe(marker.value)
        }
      })

      // Modal composition
      const { isModalOpen, setModalVisible } = modal()

      return {
        isPlatform,
        addOutline,
        filterOutline,

        filterQuery,
        accounts,

        marker,
        isIntersecting,

        isModalOpen,
        setModalVisible,
      }
    },
  })
</script>

<style scoped lang="css">
  .md ion-list {
    @apply mb-20; /* to accommodate the FAB */
  }

  .fab {
    --color: var(--ion-color-brand);
    --background: var(--e);
    --border-radius: 2em;

    .icon {
      --ionicon-stroke-width: 40px;
    }

    &.collapsed .label {
      @apply max-w-0;
    }
  }

  @media (prefers-color-scheme: dark) {
    .fab {
      --background: var(--e-6);
    }
  }
</style>
