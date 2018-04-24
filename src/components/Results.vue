<template>
  <div>
    <h1>Results</h1>
    <h2>Score: <span id="score">{{ score }}%</span></h2>
    <table v-if="words.length > 0">
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
          v-bind:class="{ success: word.success }">
          <td>{{ word.native }}</td>
          <td>{{ word.foreign }}</td>
          <td>{{ word.guess }}</td>
        </tr>
      </tbody>
    </table>
    <router-link to="/list">
      <button>Back</button>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Results',
  data () {
    return {
      words: this.$store.state.currentTestWords
    }
  },
  computed: mapGetters(['score'])
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  tbody tr {
    background: red;
    color: white;
  }

  tbody tr.success {
    background: green;
  }
</style>
