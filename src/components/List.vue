<template>
  <div>
    <h2>Word list</h2>
    <form v-on:submit.prevent="addWord()">
      <div>
        <label for="native">Word</label>
        <input type="text"
          id="native"
          placeholder="Enter a native word here"
          autofocus="autofocus"
          v-model.trim="newWord.native">
      </div>
      <br>
      <div>
        <label for="foreign">Translation</label>
        <input type="text"
          id="foreign"
          placeholder="Enter a foreign translation"
          v-model.trim="newWord.foreign">
      </div>
      <button type="submit">Add</button>
    </form>
    <router-link to="/test">
      <button id="startTest"
        v-bind:disabled="readyForTest">
        Start Test
      </button>
    </router-link>

    <table>
      <thead>
        <tr>
          <th>Native</th>
          <th>Foreign</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(word, index) in words"
          v-bind:key="word.id">
          <td>{{word.native}}</td>
          <td>{{word.foreign}}</td>
          <td>
            <i class="material-icons"
              v-on:click="removeWord(index)">
              remove_circle
            </i>
          </td>
        </tr>
      </tbody>
    </table>
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
      return this.$store.state.list.words
    },
    readyForTest () {
      return !(this.words.length > 0)
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
  form {
    width: 100px;
    margin: 10px auto;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    min-width: 350px;
    max-width: 90%;
  }
  table {
    margin: auto;
    min-width: 50%;
    max-width: 90%;
  }
</style>
