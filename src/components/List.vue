<template>
  <div>
    <h1>Word list</h1>
    <form class="form" v-on:submit="addWord()">
      <label for="native">Word</label>
      <input type="text" id="native" v-model="newWord.native">
      <label for="foreign">Translation</label>
      <input type="text" id="foreign" v-model="newWord.foreign">
      <button type="submit">Add</button>
    </form>
    <router-link to="/test">
      <button v-bind:disabled="readyForTest">Start Test</button>
    </router-link>

    <ul class="list">
      <li v-for="(word, index) in words" v-bind:key="word.id">
        {{word.native}}
        <i class="material-icons">compare_arrows</i>
        {{word.foreign}}
        <i class="material-icons" v-on:click="removeWord(index)">remove_circle</i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      newWord: {
        native: '',
        foreign: ''
      }
    }
  },
  created: function () {
    this.$store.dispatch('fetchWords').catch(() => {
      alert('Something went wrong. We failed to retrieve your words.')
    })
  },
  computed: {
    words () {
      return this.$store.state.words
    },
    readyForTest () {
      return !this.words.length
    }
  },
  methods: {
    addWord () {
      this.$store.dispatch('addWord', this.newWord)
        .then(() => {
          this.newWord.native = ''
          this.newWord.foreign = ''
        }).catch(() => {
          alert('Sorry! We failed to save your word.')
        })
    },
    removeWord (index) {
      this.$store.dispatch('removeWord', index)
        .catch(() => {
          alert('Damn! We couldn\'t remove your word.')
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
