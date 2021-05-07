<template>
  <div id="app-root">
    Hello, World!
    <router-view/>
  </div>
</template>

<style scoped lang="css">
  #app-root {
    padding:
      max(env(safe-area-inset-top), 1em)
      max(env(safe-area-inset-right), 1em)
      max(env(safe-area-inset-bottom), 1em)
      max(env(safe-area-inset-left), 1em);
  }
</style>
