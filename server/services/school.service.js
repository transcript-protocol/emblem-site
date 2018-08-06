const schoolRepository = require('../repositories/school.repository')

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