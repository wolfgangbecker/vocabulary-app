<template>
  <div class="container">
    <h2>Test</h2>
    <p>
      Current word:
      <span id="currentWord">{{ (currentWord || {}).native }}</span>
    </p>
    <form v-on:submit.prevent="onSubmit">
      <input type="text"
        placeholder="Enter the translation"
        v-model="currentGuess">
      <button type="submit">Next</button>
    </form>
    <div class="bottom">
      <progress-bar v-bind:percentage="progress"></progress-bar>
      <router-link to="/">
        <button>Leave Test</button>
      </router-link>
    </div>
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
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .progress-bar {
    flex: 1;
    display: inline;
    margin-right: 5px;
  }
  .bottom {
    width: 300px;
    height: 20px;
    margin: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
