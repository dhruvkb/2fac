<template>
  <div class="icon block" v-html="svgContent"/>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
  } from 'vue'
  import { useStore } from 'vuex'

  export default defineComponent({
    name: 'Icon',
    props: {
      name: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const store = useStore()

      const svgContent = computed(() => store.state.ui.icons[props.name])
      if (!svgContent.value) {
        store.commit('ui/setIcon', { name: props.name, svgContent: 'PENDING' })
        store.dispatch('ui/fetchIcon', { name: props.name })
      }

      return {
        svgContent,
      }
    },
  })
</script>

<style lang="css">
  .icon svg {
    @apply h-full w-full;
  }
</style>
