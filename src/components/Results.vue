<template>
  <div>
    <h1>Results</h1>
    <h2>Score: {{ score }}%</h2>
    <table v-if="words.length > 0">
      <thead>
        <tr>
          <th>Words</th>
          <th>Translations</th>
          <th>Your answer</th>
        </tr>
      </thead>
      <tbody>
        <tr v-bind:key="word.id"
          v-for="word in words"
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
export default {
  name: 'Results',
  data () {
    return {
      words: this.$store.state.currentTestWords
    }
  },
  computed: {
    score () {
      if (this.words.length === 0) {
        return 0
      }

      const successCount = this.words
        .map(word => word.success ? 1 : 0)
        .reduce((acc, num) => acc + num, 0)

      return Math.round(successCount / this.words.length * 100)
    }
  }
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
