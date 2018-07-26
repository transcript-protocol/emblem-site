// talks to the database / calls outside of the server
// all Web3.js to call solidity contracts will happen here

const Student = require('../entities/Student')

const studentRepository = {}

studentRepository.getStudent = (username) => {
    //if (id.match(/^[0-9a-fA-F]{24}$/)) {
        return Student.findOne({ username })
        .then( student => {
          console.log('STUDENT INFO IS: ', student) 
          return student
        })

        
    //}
    //throw new Error('id format is not valid')
}

studentRepository.storeStudent = (studentInfo) => {
    console.log('CLIENT INPUT: ', studentInfo)
    const newStudent = new Student(studentInfo)
    return newStudent.save()
    .then( student => {
        console.log('DATABASE ENTRY:', student)
        return student
    })
}

studentRepository.updateStudent = (studentInfo) => {
    return Student.findOne({ username: studentInfo.username })
    .then( student => {
        console.log('CLIENT INPUT: ', studentInfo)
        return student.set(studentInfo).save()
    }).then( student => {
        console.log('HERE ', student)
        return student
    })
}


studentRepository.deleteStudent = (username) => {
    return Student.findOne({ username }).remove()
}

module.exports = studentRepository
