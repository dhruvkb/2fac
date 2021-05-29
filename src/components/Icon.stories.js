import Icon from '@/components/Icon.vue'

export default {
  title: 'Components/Icon',
  component: Icon,
}

const Template = (args) => ({
  components: { Icon },
  setup() {
    return { args }
  },
  template: `
    <div class="w-8 h-8">
      <Icon
        class="w-8 h-8"
        v-bind="args"/>
    </div>
  `,
})

export const Primary = Template.bind({})
Primary.args = {
  name: 'bootstrap',
}
