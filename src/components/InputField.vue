<template>
  <label
    class="block"
    :class="wrapperClasses">
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
        v-bind="$attrs"
        v-model="modelValue_"
        :class="[...iconName ? ['pl-9'] : []]"
        :required="isRequired"
        tabindex="0"/>
    </div>
  </label>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Icon from '@/components/Icon.vue'

  /**
   * An input field is used for textual input to the application. This component
   * is a transparent wrapper over the HTML `input` element with type 'text'.
   */
  export default defineComponent({
    inheritAttrs: false,
    name: 'InputField',
    components: {
      Icon,
    },
    props: {
      /**
       * _the text label associated with the input field_; Set this wherever
       * possible, for accessibility.
       */
      label: {
        type: String,
      },
      /**
       * _the name of the icon to show inside the input field_; Use a name from
       * the [Bootstrap icons set](https://icons.getbootstrap.com).
       */
      iconName: {
        type: String,
      },
      /**
       * _an array of classes for the wrapper `label` element_; All classes set
       * directly on the component are passed down to the enclosed `input`
       * element.
       */
      wrapperClasses: {
        type: Array,
        default: () => [],
      },
      /**
       * _whether an input is required in the field_; Setting this places a red
       * asterisk on the label as an indicator.
       */
      isRequired: {
        type: Boolean,
      },
      /**
       * _the value to set on the input field_; This is used by `v-model`.
       */
      modelValue: {
        type: String,
        default: '',
      },
    },
    emits: {
      'update:modelValue': (val: unknown) => typeof val === 'string',
    },
    computed: {
      modelValue_: {
        get(): string {
          return this.modelValue
        },
        set(val: string): void {
          /**
           * _update event for the `modelValue` prop_; This is best used with
           * the `v-model` functionality.
           *
           * @event update:modelValue
           * @property {string} the updated value of the `v-model`-ed string
           */
          this.$emit('update:modelValue', val)
        },
      },
    },
  })
</script>
