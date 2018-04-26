<template>
  <div class="ui large progress green" data-total="100">
    <div class="bar" v-bind:style="{ width: textPercentage }"></div>
    <div class="label">{{ textPercentage }}</div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    percentage: {
      type: Number,
      default: 0
    }
  },
  computed: {
    textPercentage () {
      return this.percentage + '%'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
