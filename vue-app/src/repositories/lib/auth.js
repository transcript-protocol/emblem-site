import moment from 'moment'

export default class Auth {
  constructor (authToken, authExpiration) {
    if (authExpiration && authToken && moment(authExpiration) > moment()) {
      this.token = authToken
    }
  }

  setToken (token) {
    this.token = token
    localStorage.setItem('authToken', token)
    localStorage.setItem('authExpiration', moment(Date.now().toISOString).add(1, 'day'))
  }

  removeToken () {
    delete this.token
  }

  hasToken () {
    return this.token !== undefined
  }
}
