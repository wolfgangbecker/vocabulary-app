<template>
  <div>
    <h1>Vocabulary App</h1>
    <form class="form">
      <label for="word">Word</label>
      <input type="text" id="word">
      <label for="translation">Translation</label>
      <input type="text" id="translation">
    </form>

    <div class="list"></div>
  </div>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
