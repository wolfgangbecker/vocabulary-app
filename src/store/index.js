import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    words: [{
      native: 'Hello',
      foreign: 'Hola',
      id: 0
    }],
    nextId: 1
  },
  mutations: {
    addWord (state, newWord) {
      state.words.push({
        ...newWord,
        id: state.nextId++
      })
    },
    removeWord (state, index) {
      state.words.splice(index, 1)
    }
  },
  getters: {
    // returns an array of random words
    // use the amount parameter to change the size of the array
    randomWords: (state) => (amount = 20) => {
      const random = []
      for (var i = amount - 1; i >= 0; i--) {
        random.push(state.words[Math.floor(Math.random() * state.words.length)])
      }
      return random
    }
  }
})
