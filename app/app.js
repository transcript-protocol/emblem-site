/*
Written by Maria Galebach && Anna Cuddeback 
7/25/18, updated 
Property of EmblemEDU
Takes elements from form and creates a user object to be passed to the back end
*/

//////////////////////////////////////////
//messy general fetch code starts here///
////////////////////////////////////////

const baseUrl = 'http://localhost:4000/' //change this to base url of remote server once it's set up


function generalGet(_url) { //need to modify to check for authorization
  fetch(_url)
  .then(function(response) {
      console.log(response);
  })
}

function generalPost(_url, _reqBody) { 
  fetch(_url, { 
      method: "post",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      //make sure to serialize your JSON body
      body: JSON.stringify(_reqBody)
  }).then( (response) => { 
      console.log(response)
  })
}

function generalPut(_url, _reqBody) {  //need to modify to check for authorization
  fetch(_url, {
    method: "put",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  },
  //make sure to serialize your JSON body
  body: JSON.stringify(_reqBody)
  })
}

function generalDelete(_url) {  //need to modify to check for authorization
  fetch(_url, {
    method: "delete"
  })
  .then( (response) => {
    console.log(response)
  })
}


////////////////////////////////////////
//messy general fetch code ends here///
//////////////////////////////////////



///////////////////////////////////////////
//code for defining objects starts here///
/////////////////////////////////////////

//defines user object
class User {
  constructor(username, password, accountType) {
      this.username = username
      this.password = password
      this.accountType = accountType
  }
}

//defines counselor object
class Counselor {
  constructor(username, firstName, middleName, lastName, userDOB, schoolID) {
      this.username = username;
      this.firstName = firstName;
      this.middleName = middleName;
      this.lastName = lastName;
      this.userDOB = userDOB;
      this.schoolID = schoolID;
  }
}

//defines student object
class Student {
  constructor(username, firstName, middleName, lastName, userDOB, schoolID) {
      this.username = username;
      this.firstName = firstName;
      this.middleName = middleName;
      this.lastName = lastName;
      this.userDOB = userDOB;
      this.schoolID = schoolID;
  }
}

/////////////////////////////////////////
//code for defining objects ends here///
///////////////////////////////////////



///////////////////////////////////////////
//code for registering user starts here///
/////////////////////////////////////////

function getAccountTypeRadioValue() {

  if(document.getElementById('typeStudent').checked){
      return 'student';
  }
  else if (document.getElementById('typeCounselor').checked){

      return 'guidance';
  }

}

function getTermsCheckValue() {
  const checkedValue = document.getElementById('checky').checked
  return checkedValue
}

function createUser(username, password, accountType) {
  return new User(username, password, accountType)
}

function createCounselor(username, firstName, middleName, lastName, userDOB, schoolID) {
  return new Counselor(username, firstName, middleName, lastName, userDOB, schoolID)
}
function createStudent(username, firstName, middleName, lastName, userDOB, schoolID) {
  return new Student(username, firstName, middleName, lastName, userDOB, schoolID)

}

// Scrapes data from form and makes a user
function scrapeUser() {
  var username = document.getElementById("email").value
  var password = document.getElementById("password").value
  var accountType = getAccountTypeRadioValue()

  var user = createUser(username, password, accountType)
  console.log(user)
  return user

}

// Scrapes data from form and makes a guidance counselor
function scrapeCounselor() {
  var username = document.getElementById("email").value
  var firstName = document.getElementById("firstName").value
  var middleName = document.getElementById("middleName").value
  var lastName = document.getElementById("lastName").value
  var userDOB = document.getElementById("DOB").value
  var schoolID = document.getElementById("School").value

  var counselor = createCounselor(username, firstName, middleName, lastName, userDOB, schoolID)
  console.log(counselor)
  return counselor
}

function scrapeStudent() {
  var username = document.getElementById("email").value
  var firstName = document.getElementById("firstName").value
  var middleName = document.getElementById("middleName").value
  var lastName = document.getElementById("lastName").value
  var userDOB = document.getElementById("DOB").value
  var schoolID = document.getElementById("School").value

  var student = createStudent(username, firstName, middleName, lastName, userDOB, schoolID)
  console.log(student)
  return student
}


// function scrapeAll() {
//   var accountType = getAccountTypeRadioValue()
//   scrapeUser()
//   if (accountType == 'guidance'){
//       scrapeCounselor()
//   } else if (accountType == 'student'){
//       scrapeStudent()
//   }
     
// }

//gets data from form and makes post requests to localhost
function submitUser () {
  if (getTermsCheckValue() === true ) {
    var accountType = getAccountTypeRadioValue()
    user = scrapeUser()
    // console.log(user)
    username = String(user.username)
    // console.log(username)
    var studentUrl
    const userUrl = baseUrl + 'user'
    console.log(userUrl)
    generalPost(userUrl, user)
    if (accountType == 'guidance'){
        guidance = scrapeCounselor()
        // console.log(guidance)
        const guidanceUrl = baseUrl + 'guidance'
        console.log(guidanceUrl)
        generalPost(guidanceUrl, guidance)
    } else if (accountType == 'student'){
        student = scrapeStudent()
        // console.log(student)
        studentUrl = baseUrl + 'student'
        console.log(studentUrl)
        generalPost(studentUrl, student)
    }
  }else {
    alert('please agree to the terms and conditions')
  }


} 

/////////////////////////////////////////
//code for registering user ends here///
///////////////////////////////////////

/////////////////////////////////////////
//code for loging in user starts here///
///////////////////////////////////////


function loginUser () {
  const username = document.getElementById("email").value
  const password = document.getElementById("password").value
  const userUrl = baseUrl + 'user/' + username
  console.log(userUrl)
  const user = {
    'username': username,
    'password': password,
  }
  loginUrl = baseUrl + 'user/login'
  generalPost(loginUrl, user)
  
  
}
// .then( (user) => {
  
//   .then(passwordMatch => {
//     if(passwordMatch != "true") {
//       alert("password did not match")
//       return passwordMatch
//     }else {
//       return passwordMatch
//     }
//   })
// })

/////////////////////////////////////////
//code for loging in user starts here///
///////////////////////////////////////

///////////////////////////////////////////////
//code for uploading Transcript starts here///
/////////////////////////////////////////////

class Transcript {
  constructor(pdfText, username, studentUsername, schoolID) {
      this.pdfText = pdfText
      this.username = username
      this.studentUsername = studentUsername
      this.schoolID = schoolID
      
  }
}

function createTranscript(pdfText, username, studentUsername, schoolID) {
  upload = new Transcript(pdfText, username, studentUsername, schoolID)
  console.log(upload)
  console.log("why meeeeee")
  return upload
}

/////////////////////////////////////////////
//code for uploading Transcript ends here///
///////////////////////////////////////////