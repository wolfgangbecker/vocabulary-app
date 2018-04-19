<template>
  <div>
    <h2>Test</h2>
    <progress-bar v-bind:percentage="progress"></progress-bar>
    <span>{{ currentWord.native }}</span>
    <form v-on:submit="onSubmit">
      <input type="text" v-model="currentGuess">
      <button type="submit">Next</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProgressBar from './ProgressBar'

export default {
  name: 'Test',
  components: { ProgressBar },
  created: function () {
    this.$store.dispatch('newTest')
  },
  data () {
    return {
      currentGuess: ''
    }
  },
  computed: mapGetters({
    currentWord: 'currentTestWord',
    progress: 'testProgress'
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
