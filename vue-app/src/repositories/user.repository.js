export default class UserRepository {
  constructor () {
    this.token = ''
    this.auth = false
  }

  makeRequest (route, options) {
    return fetch(route, options).then(this.handleErrors)
  }

  handleErrors (response) {
    if (!response.ok) {
      throw Error(`${response.status} ${response.statusText}`)
    }
    return response
  }

  toJSON (response) {
    return response.json()
  }

  setToken (token) {
    this.token = token
  }

  getUser () {
    const options = {
      headers: {
        'x-access-token': this.token,
        'Content-Type': 'application/json'
      }
    }
    return this.makeRequest('/user', options).then(this.toJSON)
  }

  createUser (userData) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }
    return this.makeRequest('/user', options).then(this.toJSON)
  }

  updateUser (userData) {
    const options = {
      method: 'PUT',
      headers: {
        'x-access-token': this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }
    return this.makeRequest('/user', options)
  }

  deleteUser () {
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': this.token,
        'Content-Type': 'application/json'
      }
    }
    return this.makeRequest('/user', options)
  }

  loginUser (loginData) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    }
    return this.makeRequest('/user/login', options).then(this.toJSON)
  }
}
