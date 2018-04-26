<template>
  <div class="host">
    <h2 class="ui dividing header">Results</h2>
    <div class="ui right aligned grid">
      <div class="left floated left aligned six wide column">
          <div class="ui green circular huge segment">
            <h2 class="ui green header">
              <span id="score">{{ score }}%</span>
              <div class="sub header">correct</div>
            </h2>
          </div>
      </div>
      <div class="right floated right aligned six wide column">
        <router-link to="/list">
          <button class="ui labeled large primary icon button">
            <i class="reply icon"></i>
            Back
          </button>
        </router-link>
      </div>
    </div>
    <table class="ui celled unstackable olive table">
      <thead>
        <tr>
          <th>Words</th>
          <th>Translations</th>
          <th>Your answer</th>
        </tr>
      </thead>
      <tbody>
        <tr v-bind:key="index"
          v-for="(word, index) in words"
          v-bind:class="[ word.success ? 'positive' : 'negative' ]">
          <td>{{ word.native }}</td>
          <td>{{ word.foreign }}</td>
          <td>{{ word.guess }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Results',
  data () {
    return {
      words: this.$store.state.test.currentTestWords
    }
  },
  computed: mapGetters(['score'])
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .host {
    margin-bottom: 40px;
  }
</style>
