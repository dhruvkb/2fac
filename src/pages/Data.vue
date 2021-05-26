<template>
  <div class="max-w-screen-tl mx-auto px-4-safe mt-4">
    <h2
      class="font-bold text-3xl"
      :class="headerClasses"
      ref="marker">
      Data
    </h2>
  </div>

  <div class="page max-w-screen-tl mx-auto mt-4 mb-8" id="data">
    <div class="tp:px-4-safe">
      <Disclaimer class="mt-4"/>
    </div>

    <div class="px-4-safe">
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
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import Disclaimer from '@/data/Disclaimer.vue'
  import GitHub from '@/data/GitHub.vue'
  import File from '@/data/File.vue'
  import Delete from '@/data/Delete.vue'

  import { intersection } from '@/plugins/intersection'
  import { useStore } from 'vuex'

  export default defineComponent({
    name: 'Data',
    components: {
      Delete,
      Disclaimer,
      GitHub,
      File,
    },
    setup() {
      const store = useStore()
      store.commit('ui/setCurrentPage', { currentPage: 'Data' })

      const { marker, headerClasses } = intersection()

      return {
        marker,
        headerClasses,
      }
    },
  })
</script>
