<template>
  <TransitionRoot
    as="template"
    :show="isVisible"
    appear>
    <Dialog
      as="div"
      class="fixed inset-0 z-30"
      @close="handleExit"
      open>
      <div class="relative tp:flex tp:items-center tp:justify-center h-full">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-300 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-black opacity-75"/>
        </TransitionChild>

        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="translate-y-full tp:translate-y-0 tp:opacity-0 tp:scale-95"
          enter-to="translate-y-0 tp:translate-y-0 tp:opacity-1 tp:scale-100"
          leave="duration-300 ease-in"
          leave-from="translate-y-0 tp:translate-y-0 tp:opacity-1 tp:scale-100"
          leave-to="translate-y-full tp:translate-y-0 tp:opacity-0 tp:scale-95">
          <div
            class="absolute tp:static bottom-0 tp:bottom-1/2 bg-white pt-4 pb-4-safe tp:pb-4 w-full max-w-screen-tp rounded-t-xl tp:rounded-b-xl overflow-hidden shadow-xl transform transition-all">
            <button
              tabindex="-1"
              class="absolute top-2 right-2 tp:hidden p-2 rounded-full mb-4 focus:outline-none"
              @click="handleExit">
              <Icon
                class="h-5 w-5 text-gray-300"
                name="x-circle-fill"/>
            </button>
            <slot/>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue'

  import Icon from '@/components/Icon.vue'

  export default defineComponent({
    name: 'Modal',
    components: {
      Dialog,
      DialogOverlay,
      TransitionRoot,
      TransitionChild,
      Icon,
    },
    props: {
      isVisible: {
        type: Boolean,
      },
    },
    setup(props, { emit }) {
      const handleExit = () => {
        emit('update:isVisible', false)
      }

      return {
        handleExit,
      }
    },
  })
</script>
