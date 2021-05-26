<template>
  <div class="max-w-screen-tl mx-auto px-4-safe mt-4">
    <h2
      class="font-bold text-3xl"
      :class="headerClasses"
      ref="marker">
      About
    </h2>
  </div>

  <div class="page max-w-screen-tl px-4-safe mx-auto mt-4 mb-8" id="about">
    <p class="mt-4">
      2Fac is a time-based OTP generator that can be used for two-factor
      authentication. 2FA helps secure your account by making the login process
      a combination of something you know (your username and password) and something
      you have (your trusted phone or computer).
    </p>
    <p class="mt-4">
      There are several multi-factor authenticator applications out there,
      including behemoths like Authy and Google Authenticator.
      Why make another one? Because they are all lacking, and we can do better.
    </p>
    <p class="mt-4">
      I can explain... let me explain...
    </p>

    <div class="bg-gl-6 dark:bg-gd-5 p-4 border border-sep-l dark:border-sep-d rounded-md shadow-sm mt-8">
      <div class="flex items-center gap-2">
        <Icon
          class="h-6 w-6"
          name="palette-fill"/>
        <h3 class="font-bold text-2xl">Unparalleled beauty</h3>
      </div>
      <p class="mt-4">
        Hardly any of the authenticator apps focus on aesthetics and user
        experience. 2Fac is different. It has been designed with utmost
        attention to detail and an unwavering dedication to UX excellence.
      </p>
    </div>

    <div class="bg-gl-6 dark:bg-gd-5 p-4 border border-sep-l dark:border-sep-d rounded-md shadow-sm mt-8">
      <div class="flex items-center gap-2">
        <Icon
          class="h-6 w-6"
          name="shield-lock-fill"/>
        <h3 class="font-bold text-2xl">Data ownership</h3>
      </div>
      <p class="mt-4">
        Authenticator apps tend to lock you in. 2Fac does not need you to sign
        up, nor does it keep any of your data. You always own your data and can
        revoke our access in a single click, whenever you want.
      </p>
    </div>

    <div class="bg-gl-6 dark:bg-gd-5 p-4 border border-sep-l dark:border-sep-d rounded-md shadow-sm mt-8">
      <div class="flex items-center gap-2">
        <Icon
          class="h-6 w-6"
          name="door-open-fill"/>
        <h3 class="font-bold text-2xl">Unrestricted access</h3>
      </div>
      <p class="mt-4">
        Few authenticator apps support multi-device, and those that do are
        cumbersome. 2Fac is built on web technologies and supports as many
        devices as you have. There's no device limit of any kind.
      </p>
    </div>

    <div class="bg-gl-6 dark:bg-gd-5 p-4 border border-sep-l dark:border-sep-d rounded-md shadow-sm mt-8">
      <div class="flex items-center gap-2">
        <Icon
          class="h-6 w-6"
          name="file-earmark-code-fill"/>
        <h3 class="font-bold text-2xl">Free and open source</h3>
      </div>
      <p class="mt-4">
        Most authenticator apps are closed source. 2Fac isn't. Every bit of the
        source code involved in the project is open-source. Found a bug? Submit
        a patch. Need a feature? Add it yourself.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useStore } from 'vuex'

  import Icon from '@/components/Icon.vue'

  import { intersection } from '@/plugins/intersection'

  export default defineComponent({
    name: 'About',
    components: {
      Icon,
    },
    setup() {
      const store = useStore()
      store.commit('ui/setCurrentPage', { currentPage: 'About' })

      const { marker, headerClasses } = intersection()

      return {
        marker,
        headerClasses,
      }
    },
  })
</script>
