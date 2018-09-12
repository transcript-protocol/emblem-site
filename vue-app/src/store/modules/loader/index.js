const state = {
  isLoading: false
}

// getters
const getters = {
  // the underscore means that the parameter is not used by the function
  isLoading: (state, _getters, _rootState) => {
    return state.isLoading
  }
}

// actions
const actions = {

}

// mutations
const mutations = {
  setLoading (state, isLoading) {
    state.isLoading = isLoading
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
