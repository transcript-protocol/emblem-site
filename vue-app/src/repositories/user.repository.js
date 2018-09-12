import { makeRequest, toJSON, auth, setAuthToken } from './lib/helpers'

export default class UserRepository {
  getUser () {
    const options = {
      headers: {
        'x-access-token': auth.token,
        'Content-Type': 'application/json'
      }
    }
    return makeRequest('/user', options).then(toJSON)
  }

  createUser (userData) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }
    return makeRequest('/user', options).then(toJSON).then(setAuthToken)
  }

  updateUser (userData) {
    const options = {
      method: 'PUT',
      headers: {
        'x-access-token': auth.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }
    return makeRequest('/user', options)
  }

  deleteUser () {
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': auth.token,
        'Content-Type': 'application/json'
      }
    }
    return makeRequest('/user', options)
  }

  loginUser (loginData) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    }
    return makeRequest('/user/login', options).then(toJSON).then(setAuthToken)
  }
}
