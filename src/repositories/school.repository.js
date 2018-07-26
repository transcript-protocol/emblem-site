// talks to the database / calls outside of the server
// all Web3.js to call solidity contracts will happen here

const School = require('../entities/School')

const schoolRepository = {}

schoolRepository.getSchool = (schoolID) => {
    return School.findOne({ schoolID })
    .then( school => {
      console.log('SCHOOL INFO IS: ', school) 
      return school
    })


}



schoolRepository.storeSchool = (schoolInfo) => {
    console.log('CLIENT INPUT: ', schoolInfo)
    const newSchool = new School(schoolInfo)
    return newSchool.save()
    .then( school => {
        console.log('DATABASE ENTRY:', school)
        return school
    })
}

schoolRepository.updateSchool = (schoolInfo) => {
    return School.findOne({ schoolID: schoolInfo.schoolID })
    .then( school => {
        console.log('CLIENT INPUT: ', schoolInfo)
        return school.set(schoolInfo).save()
    }).then( school => {
        console.log('HERE ', school)
        return school
    })
}


schoolRepository.deleteSchool = (schoolID) => {
    return School.findOne({ schoolID }).remove()
}

module.exports = schoolRepository
