<template>
  <div class="page" id="home">
    <template v-if="accounts.length">
      <Timeline/>
      <div class="grid gap-2 tp:gap-4 grid-cols-2 tl:grid-cols-3 dr:grid-cols-4 py-2 tp:px-2 my-8">
        <Card
          v-for="(acc,index) in accounts"
          :key="index"
          :account="acc"
          :is-active="index === 5"/>
      </div>
    </template>
    <template v-else>
      <div class="text-center p-2 my-8">
        It's a little lonely in here.
      </div>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapState } from 'vuex'

  import Timeline from '@/home/Timeline.vue'
  import Card from '@/home/Card.vue'

  export default defineComponent({
    name: 'Home',
    components: {
      Timeline,
      Card,
    },
    computed: {
      ...mapState('twoFa', [
        'accounts',
      ]),
    },
  })
</script>
