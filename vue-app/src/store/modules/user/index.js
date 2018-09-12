import router from '../../../router'
import UserRepository from '../../../repositories/user.repository'
import UserCreator from './UserCreator'

const userRepo = new UserRepository()

const state = {
  userInfo: {},
  transcripts: [],
  profilePic: '',
  loading: false
}

// getters
const getters = {
  // the underscore means that the parameter is not used by the function
  userInfo: (state, _getters, _rootState) => {
    return state.userInfo
  },

  hasStoredUser: (state, _getters, _rootState) => {
    return state.userInfo.username !== '' && typeof state.userInfo.username === 'string'
  },

  email: (state, _getters, _rootState) => {
    return state.userInfo.username
  },

  username: (state, _getters, _rootState) => {
    return state.userInfo.username
  },

  firstName: (state, _getters, _rootState) => {
    return state.userInfo.firstName
  },

  lastName: (state, _getters, _rootState) => {
    return state.userInfo.lastName
  },

  dateOfBirth: (state, _getters, _rootState) => {
    return state.userInfo.dateOfBirth
  },

  schoolID: (state, _getters, _rootState) => {
    return state.userInfo.schoolID
  },

  transcripts: (state, _getters, _rootState) => {
    return state.transcript
  },

  profilePic: (state, _getters, _rootState) => {
    return state.profilePic
  }
}

// actions
const actions = {
  checkUser ({ commit, state }, path) {
    return userRepo.getUser()
      .then(userData => {
        console.log('COMMITTING DATA ', userData)
        commit('setUser', userData)
        return path
      })
      .catch(err => {
        console.log('ERROR CREATING USER: ', err)
        return '/login'
      })
      .finally(route => {
        commit('loader/setLoading', false, { root: true })
        return route
      })
  },

  createUser ({ commit, state }, userData) {
    commit('loader/setLoading', true, { root: true })
    const userToCreate = new UserCreator(userData)
    console.log('USER DATA FOR THE SERVER ', userToCreate)
    return userRepo.createUser(userToCreate)
      .then(authData => console.log('GOT TOKEN ', authData))
      .then(() => {
        console.log('GETTING USER')
        return userRepo.getUser()
      })
      .then(userData => {
        console.log('COMMITTING DATA ', userData)
        commit('setUser', userData)
        routeUser(userData, router)
      })
      .catch(err => {
        console.log('ERROR CREATING USER: ', err)
        router.push('/signup')
      })
      .finally(() => commit('loader/setLoading', false), { root: true })
  },

  getUser ({ commit, state }) {
    commit('loader/setLoading', true, { root: true })
    userRepo.getUser()
      .then(userData => {
        commit('setUser', userData)
        routeUser(userData, router)
      })
      .catch(err => {
        console.log('ERROR GETTING USER: ', err)
        router.push('/login')
      })
      .finally(() => commit('loader/setLoading', false), { root: true })
  },

  loginUser ({ commit, state }, loginData) {
    console.log('LOGGING IN ', loginData)
    commit('loader/setLoading', true, { root: true })
    userRepo.loginUser(loginData)
      .then(authData => console.log('GOT TOKEN ', authData))
      .then(() => {
        console.log('GETTING USER')
        return userRepo.getUser()
      })
      .then(userData => {
        console.log('COMMITTING DATA ', userData)
        commit('setUser', userData)
        routeUser(userData, router)
      })
      .catch(err => {
        console.log('ERROR LOGGING IN: ', err)
        router.push('/login')
      })
      .finally(() => commit('loader/setLoading', false), { root: true })
  }
}

// mutations
const mutations = {
  setUser (state, userData) {
    state.userInfo = userData
  },

  removeUser (state) {
    delete state.userData
  },

  setTranscripts (state, transcripts) {
    state.transcripts = transcripts
  },

  removeTranscripts (state) {
    delete state.transcripts
  },

  setProfilePic (state, pic) {
    state.profilePic = pic
  },

  removeProfilePic (state) {
    delete state.profilePic
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

function routeUser (userData, router) {
  if (userData.accountType === 'guidance') {
    router.push('/upload')
  } else {
    router.push('/profile')
  }
}
