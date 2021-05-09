<template>
  <div class="page p-2 max-w-screen-tl mx-auto my-8" id="data">
    <Disclaimer/>

    <p class="mt-4">
      There's are two ways you can manage your data. You can manage your 2FA
      secrets yourself or you can integrate 2Fac with GitHub. Both
      approaches ensure that you have complete ownership and control over your
      sensitive data.
    </p>

    <File class="mt-8"/>
    <GitHub class="mt-8"/>
    <Delete class="mt-8"/>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import Disclaimer from '@/data/Disclaimer.vue'
  import GitHub from '@/data/GitHub.vue'
  import File from '@/data/File.vue'
  import Delete from '@/data/Delete.vue'

  export default defineComponent({
    name: 'Data',
    components: {
      Delete,
      Disclaimer,
      GitHub,
      File,
    },
  })
</script>
