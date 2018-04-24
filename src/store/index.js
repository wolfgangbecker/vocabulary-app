import Vue from 'vue'
import Vuex from 'vuex'

import list from './list-module'
import test from './test-module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    list,
    test
  }
})
