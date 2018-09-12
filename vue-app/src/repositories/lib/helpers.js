import Auth from './auth'
import moment from 'moment'

const authExpiration = () => {
  const dateFromStorage = localStorage.getItem('authExpiration')
  const date = new Date(dateFromStorage)
  return moment(date.toISOString())
}

const authToken = () => localStorage.getItem('authToken')

export const makeRequest = (route, options) => {
  return fetch(route, options).then(handleErrors)
}

export const handleErrors = (response) => {
  if (!response.ok) {
    if (response.status > 204) {
      console.log('BAD CALL: ', response.status, response.statusText)
      localStorage.removeItem('authExpiration')
      localStorage.removeItem('authToken')
      auth.removeToken()
    }
    throw Error(`${response.status} ${response.statusText}`)
  }
  return response
}

export const toJSON = (response) => {
  return response.json()
}

export const setAuthToken = (authData) => {
  auth.setToken(authData.token)
  return authData
}

export const auth = new Auth(authToken(), authExpiration())
