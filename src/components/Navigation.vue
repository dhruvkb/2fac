<template>
  <nav class="grid grid-cols-3 -space-x-px text-ll-2 dark:text-ld-2">
    <RouterLink
      v-for="(link, index) in links"
      :key="index"
      class="link flex items-center justify-center gap-2 p-2 transition-colors duration-300"
      :to="{ name: link.toName }"
      active-class="active text-bl dark:text-bd">
      <div class="relative h-5 w-5">
        <Icon
          class="icon inactive absolute inset-0 transition-opacity duration-300"
          :name="link.iconName"/>
        <Icon
          class="icon active absolute inset-0 transition-opacity duration-300"
          :name="link.activeIconName"/>
      </div>
      <span class="text-sm font-medium">{{ link.text }}</span>
    </RouterLink>
  </nav>
</template>

<script>
  import { defineComponent } from 'vue'

  import Icon from '@/components/Icon.vue'

  export default defineComponent({
    name: 'Navigation',
    components: {
      Icon,
    },
    data() {
      return {
        links: [
          {
            text: 'Tokens',
            iconName: 'shield-check',
            activeIconName: 'shield-fill-check',
            toName: 'tokens',
          },
          {
            text: 'Data',
            iconName: 'hdd-stack',
            activeIconName: 'hdd-stack-fill',
            toName: 'data',
          },
          {
            text: 'About',
            iconName: 'info-circle',
            activeIconName: 'info-circle-fill',
            toName: 'about',
          },
        ],
      }
    },
  })
</script>

<style scoped lang="css">
  .link.active .icon.inactive,
  .link:not(.active) .icon.active {
    @apply opacity-0;
  }
</style>
