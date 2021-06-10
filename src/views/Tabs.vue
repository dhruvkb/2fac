<template>
  <IonPage>
    <IonTabs>
      <IonTabBar slot="bottom">
        <IonTabButton
          v-for="link in links"
          :key="link.name"
          :tab="link.name"
          :href="link.href">
          <IonIcon class="outline" :icon="link.icon"/>
          <IonIcon class="filled" :icon="link.filledIcon"/>
          <IonLabel>{{ link.display }}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useRouter } from 'vue-router'

  import capitalize from 'lodash/capitalize'

  import {
    IonIcon,
    IonLabel,
    IonPage,
    IonTabBar,
    IonTabButton,
    IonTabs,
  } from '@ionic/vue'
  import {
    settings,
    settingsOutline,
    shield,
    shieldOutline,
  } from 'ionicons/icons'

  const ionicComponents = {
    IonPage,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
  }
  export default defineComponent({
    name: 'Tabs',
    components: {
      ...ionicComponents,
    },
    setup() {
      const router = useRouter()

      const links = [
        {
          name: 'tokens',
          icon: shieldOutline,
          filledIcon: shield,
        },
        {
          name: 'settings',
          icon: settingsOutline,
          filledIcon: settings,
        },
      ].map((link) => ({
        ...link,
        display: capitalize(link.name),
        href: router.resolve({ name: link.name }).href,
      }))
      return {
        links,
      }
    },
  })
</script>

<style scoped lang="css">
  ion-tab-bar {
    border-top: var(--border);
  }

  ion-tab-button[aria-selected="true"] ion-icon.outline,
  ion-tab-button:not([aria-selected="true"]) ion-icon.filled {
    @apply hidden;
  }

  .ios {
    ion-tab-bar {
      --background: var(--g-5);
    }

    ion-tab-button {
      --padding-top: 0.25em;
    }
  }

  .md ion-tab-bar {
    --background: var(--e-8);
  }
</style>
