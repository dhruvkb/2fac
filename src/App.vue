<template>
  <div id="app-root" class="flex flex-col min-h-screen bg-gray-50">
    <div class="wrapper top top-0 border-b">
      <Header class="w-full"/>
    </div>
    <div class="content-root flex-grow">
      <RouterView/>
    </div>
    <div class="wrapper tp:relative bottom bottom-0 border-t">
      <Footer class="w-full"/>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'

  import { addListener, setBreakpoint } from '@/plugins/responsive'

  export default defineComponent({
    components: {
      Header,
      Footer,
    },
    setup() {
      setBreakpoint()
      addListener()
    },
  })
</script>

<style scoped lang="css">
  @screen tp {
    .content-root,
    .wrapper {
      --min-x-padding: 1em;
      --min-y-padding: 0.5em;
    }
  }

  .wrapper.top,
  .wrapper.bottom,
  .content-root {
    padding-right: max(env(safe-area-inset-right), var(--min-x-padding, 0.5em));
    padding-left: max(env(safe-area-inset-left), var(--min-x-padding, 0.5em));
  }

  .wrapper.top {
    padding-top: max(env(safe-area-inset-top), var(--min-y-padding, 0.5em));
    padding-bottom: var(--min-y-padding, 0.5em);
  }

  .wrapper.bottom {
    padding-top: var(--min-y-padding, 0.5em);
    padding-bottom: max(env(safe-area-inset-bottom), var(--min-y-padding, 0.5em));
  }
</style>
