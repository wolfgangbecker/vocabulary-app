<template>
  <div>
    <form class="ui form"
      v-on:submit.prevent="onSubmit">
      <h2 class="ui dividing header">Test</h2>
      <p>
        Current word:
        <span id="currentWord">{{ (currentWord || {}).native }}</span>
      </p>
      <div class="two fields">
        <div class="field">
          <div class="ui action input">
            <input type="text"
              class="ui small input"
              placeholder="Enter the translation"
              v-model="currentGuess">
            <button class="ui primary button"
              type="submit">
              Next
            </button>
          </div>
        </div>
        <div class="field">
          <progress-bar v-bind:percentage="progress"></progress-bar>
        </div>
      </div>
    </form>
    <router-link to="/">
      <button class="ui button basic negative">Leave Test</button>
    </router-link>
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
