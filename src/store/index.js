import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const words = JSON.parse(localStorage.getItem('words')) || []

export default new Vuex.Store({
  state: {
    words: words,
    nextId: words.length
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
  actions: {
    addWord (context, newWord) {
      context.commit('addWord', newWord)
      localStorage.setItem('words', JSON.stringify(context.state.words))
    },
    removeWord (context, index) {
      context.commit('removeWord', index)
      localStorage.setItem('words', JSON.stringify(context.state.words))
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
