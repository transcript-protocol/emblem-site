import router from '../../../router'
import UserRepository from '../../../repositories/user.repository'
import UserCreator from './UserCreator'
import moment from 'moment'

const userRepo = new UserRepository()

const state = {
  userInfo: {},
  profilePic: '',
  transcript: '',
  transcriptHash: '',
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

  transcript: (state, _getters, _rootState) => {
    return state.transcript
  },

  transcriptHash: (state, _getters, _rootState) => {
    return state.transcript
  },

  profilePic: (state, _getters, _rootState) => {
    return state.profilePic
  }
}

// actions
const actions = {
  checkUser ({ commit, state }, route) {
    if (typeof state.userInfo.username === 'string' && state.userInfo.username !== '') {
      router.push('/profile')
    } else {
      const authExpiration = localStorage.getItem('authExpiration')
      const authToken = localStorage.getItem('authToken')

      if (authExpiration && authToken && moment(authExpiration) > moment()) {
        const authToken = localStorage.getItem('authToken')
        userRepo.setToken(authToken)
        userRepo.getUser()
          .then(userData => {
            console.log('COMMITTING DATA ', userData)
            commit('setUser', userData)
            router.push('/profile')
          })
          .catch(err => {
            console.log('ERROR CREATING USER: ', err)
          })
          .finally(() => commit('userLoading', false))
      } else {
        localStorage.removeItem('authExpiration')
        localStorage.removeItem('authToken')
        if (route === 'profile') {
          router.push('/login')
        }
      }
    }
  },

  createUser ({ commit, state }, userData) {
    commit('userLoading', true)
    const userToCreate = new UserCreator(userData)
    console.log('USER DATA FOR THE SERVER ', userToCreate)
    return userRepo.createUser(userToCreate)
      .then(authData => {
        console.log('GOT TOKEN ', authData)
        storeAuthToken(authData.token)
        return userRepo.setToken(authData.token)
      })
      .then(() => {
        console.log('GETTING USER')
        return userRepo.getUser()
      })
      .then(userData => {
        console.log('COMMITTING DATA ', userData)
        commit('setUser', userData)
        router.push('/profile')
      })
      .catch(err => {
        console.log('ERROR CREATING USER: ', err)
      })
      .finally(() => commit('userLoading', false))
  },

  getUser ({ commit, state }) {
    commit('userLoading', true)
    userRepo.getUser()
      .then(userData => {
        commit('setUser', userData)
        router.push('/profile')
      })
      .catch(err => {
        console.log('ERROR GETTING USER: ', err)
      })
      .finally(() => commit('userLoading', false))
  },

  loginUser ({ commit, state }, loginData) {
    console.log('LOGGING IN ', loginData)
    commit('userLoading', true)
    userRepo.loginUser(loginData)
      .then(authData => {
        console.log('GOT TOKEN ', authData)
        storeAuthToken(authData.token)
        return userRepo.setToken(authData.token)
      })
      .then(() => {
        console.log('GETTING USER')
        return userRepo.getUser()
      })
      .then(userData => {
        console.log('COMMITTING DATA ', userData)
        commit('setUser', userData)
        router.push('/profile')
      })
      .catch(err => {
        console.log('ERROR LOGGING IN: ', err)
      })
      .finally(() => commit('userLoading', false))
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

  setTranscriptHash (state, hash) {
    state.transcriptHash = hash
  },

  removeTranscriptHash (state) {
    delete state.transcriptHash
  },

  setTranscript (state, transcript) {
    state.transcript = transcript
  },

  removeTranscript (state) {
    delete state.transcript
  },

  setProfilePic (state, pic) {
    state.profilePic = pic
  },

  removeProfilePic (state) {
    delete state.profilePic
  },

  userLoading (state, isLoading) {
    state.loading = isLoading
  }

  // EXAMPLE
  // setProducts (state, products) {
  //   state.all = products
  // },

  // decrementProductInventory (state, { id }) {
  //   const product = state.all.find(product => product.id === id)
  //   product.inventory--
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

function storeAuthToken (token) {
  localStorage.setItem('authToken', token)
  localStorage.setItem('authExpiration', moment().add(1, 'minute'))
}
