const pdfjsLib = require('pdfjs-dist')

const transcriptParsingUtil = {}

//
transcriptParsingUtil.getPdfInfo = (fileBuffer) => {
  const pdfData = atob(fileBuffer.toString('base64'))

  return pdfjsLib.getDocument({ data: pdfData })
  .then(pdf => pdf.getPage(1)) // pages start at 1
  .then(page => page.getTextContent())
  .then(textContent => {
    const items = textContent.items.map(item => item.str)

    const studentInfo = getStudentInfo(items)
    studentInfo.joinedText = items.join('')
    
    return studentInfo
  })
  .catch( err => {
    console.log('ERROR PARSING TRANSCRIPT: ', err)
    throw new Error(err)
  })
}

function getStudentInfo(items) {
  const fullText = items.join(' ')
  const lastYearInSchool = getStudentGraduationYear(items, fullText)
  const dateOfBirth = getStudentDateOfBirth(items, fullText)
  const { firstName, lastName, middleName } = getStudentName(items, fullText)

  return { lastYearInSchool, firstName, lastName, middleName, dateOfBirth }
}

function getStudentDateOfBirth(_items, fullText) {
  const dateOfBirthRegex = /birth.*?[0-9]{4}/i
  const dateOfBirth = fullText.match(dateOfBirthRegex)[0].split(' ').pop()
  return dateOfBirth
}

function getStudentGraduationYear(_items, fullText) {
  const lastYearInSchoolRegex = /graduat.*?[0-9]{4}/i
  let lastYearInSchool = fullText.match(lastYearInSchoolRegex)
  if(lastYearInSchool) {
    lastYearInSchool = lastYearInSchool[0].match(/[0-9]{4}/)[0]
  }
  return lastYearInSchool
}

function getStudentName(items, fullText) {
  let studentName = ''
  let firstName = ''
  let lastName = ''
  let middleName = ''

  const studentNameRegex = /student/i
  const lastCommaFirst = /[a-z]+?,\s*?[a-z]+?/i
  const firstLast = /[a-z]+?\s+?[a-z]+?/i
  const firstMiddleLast = /[a-z]+?\s+?[a-z]+?\s+?[a-z]+?/i
  const firstMidInitialLast = /[a-z]+?\s+?[a-z]\.\s+?[a-z]+?/i

  items.forEach( (item, ind, items) => {
    if(studentNameRegex.test(item)) {
      studentName = items[ind+1]
    }
  })

  if(lastCommaFirst.test(studentName)) {
    const names = studentName.split(',').map(name => name.trim())
    firstName = names[1]
    lastName = names[0]
  } else if(firstLast.test(studentName)) {
    const names = studentName.split(' ').map(name => name.trim())
    firstName = names[0]
    lastName = names[1]
  } else if(firstMiddleLast.test(studentName)) {
    const names = studentName.split(' ').map(name => name.trim())
    firstName = names[0]
    middleName = name[1]
    lastName = names[2]
  } else if(firstMidInitialLast.test(studentName)) {
    const names = studentName.split(' ').map(name => name.trim())
    firstName = names[0]
    middleName = names[1].slice(0, 1)
    lastName = names[2]
  } else if(lastFirstMidInitial.test(studentName)) {

  } else {
    throw new Error('Unable to parse student name')
  }

  return { firstName: firstName.toUpperCase(), lastName: lastName.toUpperCase(), middleName: middleName.toUpperCase() }
}

module.exports = transcriptParsingUtil
