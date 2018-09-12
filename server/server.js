const PORT = 4000
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const path = require('path')

const multer = require('multer')
const fileFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(pdf)$/)) {
        return cb(new Error('Only pdf files are allowed!'), false)
    }
    cb(null, true)
}
const upload = multer({ fileFilter })

app.use(bodyParser.urlencoded({ extended: true }), bodyParser.json())
app.use(express.static(path.join(__dirname, '../vue-app/dist')))

//controllers
const userController = require('./controllers/user.controller')
const schoolController = require('./controllers/school.controller')
const transcriptController = require('./controllers/transcript.controller')

//routes

//generic accounts
app.get('/user', userController.getUser)
app.post('/user', userController.storeUser)
app.put('/user', userController.updateUser)
app.delete('/user', userController.deleteUser)

//authentication
app.post('/user/login', userController.loginUser)

//transcript
app.post('/transcript/search', transcriptController.searchTranscripts)
app.post('/transcript', upload.array('transcripts', 12), transcriptController.storeTranscripts)
app.get('/transcript', transcriptController.getTranscript) // students get their transcript, guidance get all transcripts for the school
app.delete('/transcript/:hash', transcriptController.deleteTranscript)

//school
app.get('/school/:schoolID', schoolController.getSchool) //gets school data (name and address) from schoolID
app.get('/school/query/zip/:zip', schoolController.getSchool) 
app.post('/school', schoolController.storeSchool) // sets school data (name and address)
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