<template>
  <div
    class="timebar border-t-2 border-black"
    :style="{ width: `${percentage}%`, transform: 'translateY(-1px)' }"/>
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
