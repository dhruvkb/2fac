<template>
  <div class="page" id="home">
    <Timeline/>
    <div class="grid gap-1 tp:gap-4 grid-cols-2 tl:grid-cols-3 dr:grid-cols-4 p-2 my-4">
      <Card
        v-for="(acc,index) in accounts"
        :key="index"
        :account="acc"
        :is-active="index === 5"/>
    </div>
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
