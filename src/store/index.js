import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const words = JSON.parse(localStorage.getItem('words')) || []

export default new Vuex.Store({
  state: {
    words: words,
    currentTestWords: [],
    nextId: words.length,
    testIndex: 0
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
    },
    newTest (state) {
      state.testIndex = 0
      state.currentTestWords = this.getters.randomWords().map((word) => {
        return {
          ...word,
          guess: '',
          success: false
        }
      })
    },
    submitGuess (state, guess) {
      const currentWord = state.currentTestWords[state.testIndex]
      currentWord.guess = guess
      currentWord.success = guess === currentWord.foreign
      state.testIndex++
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
    },
    newTest (context) {
      context.commit('newTest')
    },
    submitGuess (context, guess) {
      context.commit('submitGuess', guess)
    }
  },
  getters: {
    // returns an array of random words
    // use the amount parameter to change the size of the array
    randomWords: (state) => (amount = 5) => {
      const random = []
      for (var i = amount - 1; i >= 0; i--) {
        random.push(state.words[Math.floor(Math.random() * state.words.length)])
      }
      return random
    },
    currentTestWord: (state) => {
      return state.currentTestWords[state.testIndex]
    },
    testIsFinished: (state) => {
      return state.currentTestWords.length <= state.testIndex
    }
  }
})
