<template>
  <div>
    <form>
      <label>
        <span class="text-sm font-medium">Secret:</span>
        <div class="relative flex items-center">
          <Icon
            class="absolute left-2 h-4 w-4"
            name="key"/>
          <input
            class="input font-mono w-full pl-8"
            type="text"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
            placeholder="Secret"
            :value="secret"
            :disabled="lockSecret"
            :readonly="lockSecret"
            @input="event => handleUpdate('secret', event)">
        </div>
      </label>
      <div class="grid grid-cols-2 gap-2 mt-2">
        <label>
          <span class="text-sm font-medium">Site:</span>
          <div class="relative flex items-center">
            <Icon
              class="absolute left-2 h-4 w-4"
              name="globe"/>
            <input
              class="input w-full pl-8"
              type="text"
              placeholder="Site"
              :value="site"
              @input="event => handleUpdate('site', event)">
          </div>
        </label>
        <label>
          <span class="text-sm font-medium">Username:</span>
          <div class="relative flex items-center">
            <Icon
              class="absolute left-2 h-4 w-4"
              name="person"/>
            <input
              class="input w-full pl-8"
              type="text"
              placeholder="Username"
              :value="username"
              @input="event => handleUpdate('username', event)">
          </div>
        </label>
      </div>
      <div class="flex items-end gap-2 mt-2">
        <label class="flex-grow">
          <span class="text-sm font-medium">Icon:</span>
          <div class="relative flex items-center">
            <Icon
              class="absolute left-2 h-4 w-4"
              name="app"/>
            <input
              class="input w-full pl-8"
              type="text"
              autocapitalize="off"
              autocomplete="off"
              spellcheck="false"
              placeholder="Icon"
              :value="icon"
              ref="iconField"
              @input="event => handleUpdate('icon', event)">
          </div>
        </label>
        <button
          class="button text-green-600 bg-green-100 hover:bg-green-200 focus-visible:ring-green-500"
          type="button"
          @click="handleGetIcon">
          Get icon
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
  import { ref, defineComponent } from 'vue'

  import Icon from '@/components/Icon.vue'

  export default defineComponent({
    name: 'Form',
    components: {
      Icon,
    },
    props: {
      secret: {
        type: String,
      },
      site: {
        type: String,
      },
      username: {
        type: String,
      },
      icon: {
        type: String,
      },
      lockSecret: {
        type: Boolean,
      },
    },
    setup(props, { emit }) {
      const iconField = ref(null)

      const handleUpdate = (field: string, event: InputEvent) => {
        emit(`update:${field}`, (event.target as HTMLInputElement).value)
      }
      const handleGetIcon = () => {
        emit('getIcon', iconField.value)
      }

      return {
        handleUpdate,
        handleGetIcon,
      }
    },
  })
</script>
