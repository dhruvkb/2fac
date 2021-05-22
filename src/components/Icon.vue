<template>
  <div class="icon block" v-html="svgContent"/>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    onMounted,
    ref,
  } from 'vue'

  export default defineComponent({
    name: 'Icon',
    props: {
      version: {
        type: String,
        default: '1.5.0',
      },
      name: {
        type: String,
      },
      src: {
        type: String,
      },
    },
    setup(props) {
      const url = computed(() => {
        if (props.name) {
          return `https://unpkg.com/bootstrap-icons@${props.version}/icons/${props.name}.svg`
        } if (props.src) {
          return props.src
        }
        throw Error('Either name or src is required.')
      })

      const svgContent = ref('')
      const getSvgContent = async () => {
        const res = await fetch(url.value)
        svgContent.value = await res.text()
      }

      onMounted(getSvgContent)

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
