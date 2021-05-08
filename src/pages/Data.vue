<template>
  <div class="page p-2 my-4" id="data">
    <div class="content max-w-screen-tl mx-auto">
      <Disclaimer/>

      <p class="my-4">
        With that settled, there's two ways you can manage your data. You can
        manage your 2FA secrets yourself or you can integrate Multifac with
        GitHub. Both approaches ensure that you have complete ownership and
        control over your data.
      </p>

      <File/>
      <GitHub/>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import Disclaimer from '@/data/Disclaimer.vue'
  import GitHub from '@/data/GitHub.vue'
  import File from '@/data/File.vue'

  export default defineComponent({
    name: 'Data',
    components: {
      Disclaimer,
      GitHub,
      File,
    },
  })
</script>
