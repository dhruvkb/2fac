<template>
  <nav class="grid grid-cols-3 -space-x-px">
    <RouterLink
      v-for="(link, index) in links"
      :key="index"
      class="flex items-center justify-center gap-2 p-2 transition-colors border-gray-200"
      :class="{ 'border-l': index !== 0 }"
      :to="{ name: link.toName }"
      active-class="text-blue-600">
      <Icon
        class="h-5 w-5"
        :name="link.iconName"
        :src="link.iconSrc"/>
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
            toName: 'tokens',
          },
          {
            text: 'Data',
            iconName: 'hdd-stack',
            toName: 'data',
          },
          {
            text: 'About',
            iconName: 'info-circle',
            toName: 'about',
          },
        ],
      }
    },
  })
</script>
