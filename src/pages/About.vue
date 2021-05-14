<template>
  <div class="page max-w-prose px-4-safe mx-auto my-8" id="about">
    <h2 class="font-bold text-3xl">About</h2>

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

    <div class="bg-white shadow-sm p-4 border border-gray-200 rounded-md mt-8">
      <div class="flex items-center gap-2">
        <div class="bg-gradient-to-br from-pink-400 to-purple-600 h-10 w-10 p-2 rounded-lg">
          <Icon
            class="text-white h-6 w-6"
            name="palette-fill"/>
        </div>
        <h3 class="font-bold text-purple-600 text-2xl">Unparalleled beauty</h3>
      </div>
      <p class="mt-4">
        Hardly any of the authenticator apps focus on aesthetics and user
        experience. 2Fac is different. It has been designed with utmost
        attention to detail and an unwavering dedication to UX excellence.
      </p>
    </div>

    <div class="bg-white p-4 border border-gray-200 rounded-md shadow-sm mt-8">
      <div class="flex items-center gap-2">
        <div class="bg-gradient-to-br from-red-400 to-yellow-600 h-10 w-10 p-2 rounded-lg">
          <Icon
            class="text-white h-6 w-6"
            name="shield-lock-fill"/>
        </div>
        <h3 class="font-bold text-yellow-600 text-2xl">Data ownership</h3>
      </div>
      <p class="mt-4">
        Authenticator apps tend to lock you in. 2Fac does not need you to sign
        up, nor does it keep any of your data. You always own your data and can
        revoke our access in a single click, whenever you want.
      </p>
    </div>

    <div class="bg-white p-4 border border-gray-200 rounded-md shadow-sm mt-8">
      <div class="flex items-center gap-2">
        <div class="bg-gradient-to-br from-blue-400 to-indigo-600 h-10 w-10 p-2 rounded-lg">
          <Icon
            class="text-white h-6 w-6"
            name="door-open-fill"/>
        </div>
        <h3 class="font-bold text-indigo-600 text-2xl">Unrestricted access</h3>
      </div>
      <p class="mt-4">
        Few authenticator apps support multi-device, and those that do are
        cumbersome. 2Fac is built on web technologies and supports as many
        devices as you have. There's no device limit of any kind.
      </p>
    </div>

    <div class="bg-white p-4 border border-gray-200 rounded-md shadow-sm mt-8">
      <div class="flex items-center gap-2">
        <div class="bg-gradient-to-br from-green-400 to-green-600 h-10 w-10 p-2 rounded-lg">
          <Icon
            class="text-white h-6 w-6"
            name="file-earmark-code-fill"/>
        </div>
        <h3 class="font-bold text-green-600 text-2xl">Free and open source</h3>
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

  import Icon from '@/components/Icon.vue'

  export default defineComponent({
    name: 'About',
    components: {
      Icon,
    },
  })
</script>
