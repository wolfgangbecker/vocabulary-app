import Vue from 'vue'
import Vuex from 'vuex'

import list from './list-module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    list
  },
  state: {
    currentTestWords: [],
    testIndex: 0
  },
  mutations: {
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
      currentWord.success = guess.toLowerCase() === currentWord.foreign.toLowerCase()
      state.testIndex++
    }
  },
  actions: {
    async newTest (context) {
      if (context.state.currentTestWords.length === 0) {
        await context.dispatch('fetchWords')
      }

      context.commit('newTest')
    },
    submitGuess (context, guess) {
      context.commit('submitGuess', guess)
    }
  },
  getters: {
    currentTestWord: (state) => {
      return state.currentTestWords[state.testIndex]
    },
    testIsFinished: (state) => {
      return state.currentTestWords.length <= state.testIndex
    },
    testProgress: (state) => {
      return Math.round(state.testIndex / state.currentTestWords.length * 100)
    },
    score: (state) => {
      if (state.currentTestWords.length === 0) {
        return 0
      }

      const successCount = state.currentTestWords
        .map(word => word.success ? 1 : 0)
        .reduce((acc, num) => acc + num, 0)

      return Math.round(successCount / state.currentTestWords.length * 100)
    }
  }
})
