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
import { mapGetters } from 'vuex'

export default {
  name: 'Test',
  created: function () {
    this.$store.dispatch('newTest')
  },
  data () {
    return {
      currentGuess: ''
    }
  },
  computed: mapGetters({
    currentWord: 'currentTestWord'
  }),
  methods: {
    onSubmit: function () {
      this.$store.dispatch('submitGuess', this.currentGuess)
      if (this.$store.getters.testIsFinished) {
        this.$router.push('results')
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
