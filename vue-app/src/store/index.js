import Vue from 'vue'
import Vuex from 'vuex'

import loader from './modules/loader'
import user from './modules/user'
import transcript from './modules/transcript'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    loader,
    user,
    transcript
  },
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {

  }
})
export default store
