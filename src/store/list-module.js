import axios from 'axios'

const http = axios.create({
  baseURL: `http://localhost:3000/api`
})

export default {
  state: {
    words: []
  },
  mutations: {
    addWord (state, newWord) {
      state.words.push(newWord)
    },
    setWords (state, words) {
      state.words = words
    },
    removeWord (state, index) {
      state.words.splice(index, 1)
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
    randomWords: (state) => (amount = 20) => {
      const random = []
      for (var i = amount - 1; i >= 0; i--) {
        random.push(state.words[Math.floor(Math.random() * state.words.length)])
      }
      return random
    }
  }
}
