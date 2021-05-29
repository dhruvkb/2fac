<template>
  <div
    v-if="svgContent !== 'PENDING'"
    v-html="svgContent"
    class="icon block"/>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
  } from 'vue'
  import { useStore } from 'vuex'

  /**
   * Icons are used to convey images in a pictorial form. This component enables
   * using icons from the [Bootstrap icons set](https://icons.getbootstrap.com).
   * Icons are cached in Vuex store for performance.
   */
  export default defineComponent({
    name: 'Icon',
    props: {
      /**
       * _the name of the icon_; Use names from the
       * [Bootstrap icons set](https://icons.getbootstrap.com). Invalid names
       * will not render the component.
       */
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
