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
  }
})
