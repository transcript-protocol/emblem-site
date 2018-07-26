// defines all your routes, is called server.js beacuse it's the top level file
// server.js is kind of a misnomer because all of this is the server
// is called server.js because ti's the top level file

const PORT = 3000
const express = require('express')
const app = express()


// const moment = require('moment')
const path = require('path')
const bodyParser = require('body-parser')

//this says if you receive json automatically convert to javascript object
// takes weird json file in request and makes it into req.body
//`app.use` says use this library, 
app.use(bodyParser.urlencoded({ extended: true }), bodyParser.json())
app.use(express.static(path.join(__dirname, '../site')))

//controllers
const userController = require('./controllers/user.controller')
const schoolController = require('./controllers/school.controller')

//routes

app.get('/helloworld', (req, res) => res.end('hello world')) //hello world

//generic accounts
app.get('/user/:username', userController.getUser) //gets user account data (uname, pass, account type) from username
app.post('/user/:username', userController.storeUser) // sets user account data (uname, pass, account type)
app.put('/user/:username', userController.updateUser) //updates user account data (uname, pass, account type) by username
app.delete('/user/:username', userController.deleteUser) //deletes user account (uname, pass, account type) by username

//guidance counselor
app.get('/guidance/:username', userController.getGuidance) //gets guidance counselor data (name, DOB, school name) from username
app.post('/guidance/:username', userController.storeGuidance) // sets guidance counselor data (name, DOB, school name)
app.put('/guidance/:username', userController.updateGuidance) //updates guidance counselor data (name, DOB, school name) by username
app.delete('/guidance/:username', userController.deleteGuidance) //deletes guidance counselor data (name, DOB, school name) by username

//student
app.get('/student/:username', userController.getStudent) //gets student data (name, DOB, school name) from username
app.post('/student/:username', userController.storeStudent) // sets student data (name, DOB, school name)
app.put('/student/:username', userController.updateStudent) //updates student data (name, DOB, school name) by username
app.delete('/student/:username', userController.deleteStudent) //deletes student data (name, DOB, school name) by username

//hash
app.get('/hash/:hashValue', userController.getHash) //gets hash data (hashValue, username, studentUsername) from hashValue
app.post('/hash', userController.storeHash) // sets hash data (hashValue, username, studentUsername, date&time updated)
app.put('/hash', userController.updateHash) //updates hash data (hashValue, username, studentUsername) by hashValue
app.delete('/hash/:hashValue', userController.deleteHash) //deletes hash data (hashValue, username, studentUsername) by hashValue

//school
app.get('/school/:schoolID', schoolController.getSchool) //gets school data (name and address) from schoolID
app.get('/school/query/zip/:zip', schoolController.getSchool) 
app.post('/school/:schoolID', schoolController.storeSchool) // sets school data (name and address)
app.put('/school/:schoolID', schoolController.updateSchool) //updates school data (name and address) by schoolID
app.delete('/school/:schoolID', schoolController.deleteSchool) //deletes school data (name and address) by schoolID


//error handling
app.use((req, res, next) => res.status(404).send("Resource Not Found"))

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Server Error')
})

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))

module.exports = app