export default class UserCreator {
  constructor (data) {
    this.username = data.email
    this.accountType = data.accountType
    this.firstName = data.firstName
    this.middleName = data.middleName
    this.lastName = data.lastName
    this.dateOfBirth = data.userDOB
    this.schoolID = data.schoolID
    this.password = data.password
    this.confirmPassword = data.confirmPassword
    this.acceptedTerms = data.acceptTerms
  }
}
