<template>
  <div>
    <form class="ui form"
      v-on:submit.prevent="addWord()">
      <h2 class="ui dividing header">Word list</h2>
      <div class="three fields">
        <div class="field">
          <div class="ui small labeled input">
            <div class="ui label">
              Word
            </div>
            <input type="text"
              id="native"
              ref="native"
              placeholder="Enter a native word here"
              autofocus="autofocus"
              required
              v-model.trim="newWord.native">
          </div>
        </div>
        <div class="field">
          <div class="ui small labeled input">
            <div class="ui label">
              Translation
            </div>
            <input type="text"
              id="foreign"
              placeholder="Enter a foreign translation"
              required
              v-model.trim="newWord.foreign">
          </div>
        </div>
        <div class="field">
          <button type="submit"
            class="ui icon primary button">
            <i class="plus icon"></i>
          </button>
          <router-link to="/test" id="startTest"
            class="ui positive button"
            v-bind:class="{ disabled: !readyForTest }">
              Start Test
          </router-link>
        </div>
      </div>
    </form>

    <table class="ui celled unstackable table">
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
            <button class="ui circular icon red button"
              v-on:click="removeWord(index)">
              <i class="minus icon"></i>
            </button>
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
      return this.words.length > 0
    }
  },
  methods: {
    addWord () {
      this.$store.dispatch('addWord', this.newWord)
        .then(() => {
          this.newWord.native = ''
          this.newWord.foreign = ''
          this.$refs.native.focus()
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
<style lang="scss" scoped>
</style>
