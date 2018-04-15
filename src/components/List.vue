<template>
  <div>
    <h1>Vocabulary App</h1>
    <form class="form" v-on:submit="addWord()">
      <label for="native">Word</label>
      <input type="text" id="native" v-model="newWord.native">
      <label for="foreign">Translation</label>
      <input type="text" id="foreign" v-model="newWord.foreign">
      <button type="submit">Add</button>
    </form>
    <button>Start Test</button>

    <ul class="list">
      <li v-for="word in words" v-bind:key="word.id">
        {{word.native}}
        <i class="material-icons">compare_arrows</i>
        {{word.foreign}}
        <i class="material-icons">remove_circle</i>
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
      },
      nextId: 1,
      words: [{
        native: 'Hello',
        foreign: 'Hola',
        id: 0
      }]
    }
  },
  methods: {
    addWord () {
      this.words.push({
        ...this.newWord,
        id: this.nextId++
      })
      this.newWord.native = ''
      this.newWord.foreign = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
