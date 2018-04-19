import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// const http = axios.create({
//   baseURL: `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}`
// })
const http = axios.create({
  baseURL: `http://localhost:3000/api`
})

Vue.use(Vuex)

// const words = JSON.parse(localStorage.getItem('words')) || []
const words = []

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
    setWords (state, words) {
      state.words = words
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
    async addWord (context, newWord) {
      const response = await http.post('words', newWord)

      if (response.status === 200) {
        context.commit('addWord', response.data)
      }
    },
    async removeWord (context, index) {
      const word = context.state.words[index]
      const response = await http.delete(`words/${word.id}`)

      if (response.status === 200) {
        context.commit('removeWord', index)
      }
    },
    newTest (context) {
      context.commit('newTest')
    },
    submitGuess (context, guess) {
      context.commit('submitGuess', guess)
    },
    async fetchWords (context) {
      const response = await http.get('words')

      if (response.status === 200) {
        context.commit('setWords', response.data)
      }
    }
  },
  getters: {
    // returns an array of random words
    // use the amount parameter to change the size of the array
    randomWords: (state) => (amount = 3) => {
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
