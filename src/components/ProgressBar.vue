<template>
  <div class="progress-bar">
    <div class="progress" v-bind:style="{ width: percentage + '%' }"></div>
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .progress-bar {
    border: 1px solid black;
    width: 100px;
    height: 20px;
  }
  .progress {
    background: blue;
    height: 20px;
  }
</style>
