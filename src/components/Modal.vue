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
          <DialogOverlay class="absolute inset-0 bg-black opacity-50"/>
        </TransitionChild>

        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="translate-y-full tp:translate-y-0 tp:opacity-0 tp:scale-95"
          enter-to="translate-y-0 tp:translate-y-0 tp:opacity-1 tp:scale-100"
          leave="duration-300 ease-in"
          leave-from="translate-y-0 tp:translate-y-0 tp:opacity-1 tp:scale-100"
          leave-to="translate-y-full tp:translate-y-0 tp:opacity-0 tp:scale-95">
          <div class="
            absolute tp:static
            bottom-0 tp:bottom-1/2
            bg-gl-6 dark:bg-gd-5
            w-full max-w-screen-tp
            rounded-t-xl
            shadow-xl
            overflow-hidden
            transform
            transition-all">
            <div class="
              flex items-center justify-center
              px-4-safe tp:px-4
              h-12 w-full
              border-b border-sep-l dark:border-sep-d">
              <DialogTitle
                as="h6"
                class="font-medium">
                <slot name="modal-title">Title</slot>
              </DialogTitle>
            </div>

            <div class="content pt-4 pb-4-safe tp:pb-4 sw-full tp:rounded-b-xl">
              <slot/>
            </div>
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
    DialogTitle,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue'

  export default defineComponent({
    name: 'Modal',
    components: {
      Dialog,
      DialogTitle,
      DialogOverlay,
      TransitionRoot,
      TransitionChild,
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
