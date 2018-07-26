const schoolRepository = require('../repositories/school.repository')

//just in case we need them later
const userRepository = require('../repositories/user.repository')
const guidanceRepository = require('../repositories/guidance.repository')
const studentRepository = require('../repositories/student.repository')
const hashRepository = require('../repositories/hash.repository')

const schoolService = {}

//get school
schoolService.getSchool = (schoolID) => {
  return schoolRepository.getSchool(schoolID)
}

//createschool
schoolService.storeSchool = (schoolInfo) => {
   return schoolRepository.storeSchool(schoolInfo)   
}

//updateschool
schoolService.updateSchool = (schoolInfo) => {
  return schoolRepository.updateSchool(schoolInfo)
}    
//deleteschool
schoolService.deleteSchool = (schoolID) => {
  return schoolRepository.deleteSchool(schoolID)
}



module.exports = schoolService