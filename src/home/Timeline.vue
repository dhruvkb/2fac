<template>
  <div
    class="border-t-2 transition-colors"
    :class="timelineClasses"
    :style="timelineStyles"/>
</template>

<script>
  import { defineComponent } from 'vue'
  import { mapMutations } from 'vuex'

  export default defineComponent({
    name: 'Timeline',
    data() {
      return {
        interval: 3e4,
        percentage: 100,
      }
    },
    computed: {
      timelineClasses() {
        return [
          (this.percentage < 20) ? 'border-red-600' : 'border-black',
        ]
      },
      timelineStyles() {
        return {
          width: `${this.percentage}%`,
        }
      },
    },
    methods: {
      updatePercentage() {
        const msSinceEpoch = Date.now()
        const timeRemaining = this.interval - (msSinceEpoch % this.interval)
        return (timeRemaining / this.interval) * 100
      },
      animate() {
        const newPercentage = this.updatePercentage()
        if (newPercentage > this.percentage) {
          this.updateAccounts()
        }
        this.percentage = newPercentage
        requestAnimationFrame(() => this.animate())
      },
      ...mapMutations('twoFa', [
        'updateAccounts',
      ]),
    },
    mounted() {
      this.animate()
    },
  })
</script>
