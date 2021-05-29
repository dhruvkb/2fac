import InputField from '@/components/InputField.vue'

export default {
  title: 'Components/InputField',
  component: InputField,
  argTypes: {
    'update:modelValue': {
      action: 'update:modelValue',
    },
  },
}

const Template = (args) => ({
  components: { InputField },
  setup() {
    return { args }
  },
  template: `
    <InputField
      v-bind="args"
      :value="args.modelValue"
      @update:modelValue="args['update:modelValue']"/>
  `,
})

export const Primary = Template.bind({})
Primary.args = {
  label: 'Label:',
  iconName: 'input-cursor-text',
  isRequired: true,
  wrapperClasses: ['w-64'],
  modelValue: 'Hello, World!',
}
