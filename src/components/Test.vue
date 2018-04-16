<template>
  <div>
    <h1>Test</h1>
    <span>{{ currentWord.native }}</span>
    <form v-on:submit="onSubmit">
      <input type="text" v-model="currentGuess">
      <button type="submit">Next</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      index: 0,
      currentGuess: '',
      words: this.$store.getters.randomWords().map((word) => {
        return {
          ...word,
          guess: '',
          success: false
        }
      })
    }
  },
  computed: {
    currentWord: function () {
      return this.words[this.index]
    }
  },
  methods: {
    onSubmit: function () {
      this.currentWord.guess = this.currentGuess
      this.currentWord.success = this.currentGuess === this.currentWord.foreign
      this.index++
      if (this.words.length <= this.index) {
        this.$router.push('list')
      } else {
        this.currentGuess = ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
