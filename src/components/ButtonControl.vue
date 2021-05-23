<template>
  <button
    class="
      inline-flex items-center justify-center
      tp:text-sm tp:font-medium
      h-8 tp:min-w-[8em] rounded-md
      transition-colors duration-300
      disabled:opacity-50 disabled:cursor-not-allowed
      focus:outline-none
      focus-visible:ring-1
      focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black"
    :class="[...buttonClasses]">
    <slot/>
  </button>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'ButtonControl',
    props: {
      isDangerous: {
        type: Boolean,
      },
    },
    setup(props) {
      const buttonClasses = computed(() => {
        if (props.isDangerous) {
          return [
            'text-rl', 'dark:text-rd', 'tp:text-white',
            'tp:bg-rl', 'dark:tp-bg-rd',
            'focus-visible:ring-rl', 'dark:focus-visible:ring-rd',
          ]
        }
        return [
          'text-bl', 'dark:text-bd', 'tp:text-white',
          'tp:bg-bl', 'dark:tp-bg-bd',
          'focus-visible:ring-bl', 'dark:focus-visible:ring-bd',
        ]
      })

      return {
        buttonClasses,
      }
    },
  })
</script>
