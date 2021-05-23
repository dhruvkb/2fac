<template>
  <label
    class="block"
    :class="$attrs.class">
    <span
      v-if="label"
      class="block text-sm font-medium">
      {{ label }}
      <span v-if="isRequired" class="text-rl dark:text-rd">*</span>
    </span>
    <div class="relative flex items-center text-ll-2 dark:text-ld-2 focus-within:text-ll-1 dark:focus-within:text-ld-1">
      <Icon
        v-if="iconName"
        class="h-5 w-5 absolute left-2"
        :name="iconName"/>
      <input
        class="
          appearance-none
          text-sm placeholder-ll-2 dark:placeholder-ld-2 text-ll-1 dark:text-ld-1
          bg-fl-3 dark:bg-fd-3
          px-2 py-0
          w-full h-8
          rounded-md
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none
          focus-visible:ring-1 focus-visible:ring-bl dark:focus-visible:ring-bd
          focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black"
        v-bind="attrs"
        :class="[...inputClasses, ...iconName ? ['pl-9'] : []]"
        :value="modelValue"
        tabindex="0"
        @input="handleInput"/>
    </div>
  </label>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Icon from '@/components/Icon.vue'

  export default defineComponent({
    inheritAttrs: false,
    name: 'InputField',
    components: {
      Icon,
    },
    props: {
      label: {
        type: String,
      },
      iconName: {
        type: String,
      },
      inputClasses: {
        type: Array,
        default: () => [],
      },
      isRequired: {
        type: Boolean,
      },
      modelValue: {},
    },
    computed: {
      attrs(): Record<string, unknown> {
        const attrs = { ...this.$attrs }
        delete attrs.class
        delete attrs.style
        return attrs
      },
    },
    methods: {
      handleInput(event: InputEvent) {
        this.$emit('update:modelValue', (event.target as HTMLInputElement).value)
      },
    },
  })
</script>
