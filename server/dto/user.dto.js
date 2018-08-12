class UserDTO {
  constructor(record) {
    this.id = record._id
    this.username = record.username
    this.accountType = record.accountType
    this.firstName = record.firstName
    this.middleName = record.middleName
    this.lastName = record.lastName
    this.dateOfBirth = record.dateOfBirth
    this.schoolID = record.schoolID
    this.previousSchoolIDs = record.previousSchoolIDs
  }
}

module.exports = UserDTO
