// where you send back error messages and data to the severr which gives it to the client
// handles requests from client to the server
// pretty much all the logic in here is to send error messages to server.js 
// because the service has already decided what's relevant

const userService = require('../services/user.service')

const userController = {}


/////////////////////////////////////////////////////
// CODE FOR USER ACCOUNT INFO STARTS HERE //////////
///////////////////////////////////////////////////

userController.getUser = (req, res) => {
    userService.getUser(req.params.username)
    .then((user) => {
        if (!user) {
            res.status(404).end('User does not exist')
        } else {
            res.status(200).end('got user, yeet!')
        }
    })
    .catch( err => { // 'catch' the error that was thrown by an earlier file (service or repository), and tell the browser the error type and message
        console.log(err)
        if(err === 'id format is not valid') {
            res.status(400).end(err) //send error code and error text (which is defined by `throw new Error`). 400 = invalid request
        } else {
            res.status(503).end(err) //send error code and error text. 503 = service not available
        }
    })
}

userController.storeUser = (req, res) => {
    userService.storeUser(req.body).then( (user) => {
        res.end(user.username)
    })
    .catch( (err) => {
        res.status(400).end(err)
    })
}

userController.updateUser = (req, res) => {
    userService.updateUser(req.body).then( (user)  => {
        res.end(user.username)
    })
    .then((user) => {
        if (!user){
            res.status(404).end('User does not exist')
        }else{
            res.status(200).end('User sucessfully updated')
        }
    })
    .catch ((err) => {
        res.status(400).end(err)
    })
}

userController.deleteUser = (req, res) => {
    userService.deleteUser(req.params.username).then((data) => {
            res.status(204).end()
        })
        .catch((err) => {
            console.log(err)
            res.status(400).end('DELETE_FAILED')
        })
}


////////////////////////////////////////////////////
// CODE FOR USER ACCOUNT INFO ENDS HERE ///////////
//////////////////////////////////////////////////


//-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x
// ------------- account-guidance Demilitarized Zone----------------
//-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x


////////////////////////////////////////////////////
// CODE FOR GUIDANCE INFO STARTS HERE /////////////
//////////////////////////////////////////////////

userController.getGuidance = (req, res) => {
    var guidance = userService.getGuidance(req.params.username)
    .then((guidance) => {
        if (!guidance) {
            res.status(404).end('Guidance counselor does not exist')
        } else {
            // console.log(guidance)
            // guidance = res.end(JSON.stringify(guidance))
            // console.log('WTF is going on?', guidance)
            res.status(200).end("got user!!")
        }
    })
    .catch( err => { // 'catch' the error that was thrown by an earlier file (service or repository), and tell the browser the error type and message
        console.log(err)
        if(err === 'id format is not valid') {
            res.status(400).end(err) //send error code and error text (which is defined by `throw new Error`). 400 = invalid request
        } else {
            res.status(503).end(err) //send error code and error text. 503 = service not available
        }
    })
}

userController.storeGuidance = (req, res) => {
    var guidance = userService.storeGuidance(req.body)
    .then( (guidance) => {
        console.log('WHAT IS HAPPENDING ', guidance.username)
        res.end('stored ', guidance.username)
    })
    .catch( (err) => {
        console.log('ERROR: ', err)
        res.status(400).end(err)
    })
}

userController.updateGuidance = (req, res) => {
    userService.updateGuidance(req.body).then( (guidance)  => {
        res.end(guidance.username)
    })
    .then((guidance) => {
        if (!guidance){
            res.status(404).end('User does not exist')
        }else{
            res.status(200).end('User sucessfully updated')
        }
    })
    .catch ((err) => {
        console.log('ERROR: ', err)
        res.status(400).end(err)
    })
}

userController.deleteGuidance = (req, res) => {
    userService.deleteGuidance(req.params.username).then((data) => {
            res.status(204).end()
        })
        .catch((err) => {
            console.log(err)
            res.status(400).end('DELETE_FAILED')
        })
}


///////////////////////////////////////////////////
// CODE FOR GUIDANCE INFO ENDS HERE //////////////
/////////////////////////////////////////////////


////////////////////////////////////////////////////
// CODE FOR STUDENT INFO STARTS HERE /////////////
//////////////////////////////////////////////////

userController.getStudent = (req, res) => {
    userService.getStudent(req.params.username)
    .then((student) => {
        if (!student) {
            res.status(404).end('Student does not exist')
        } else {
            res.status(200).end('got student, yeet!')
        }
    })
    .catch( err => { // 'catch' the error that was thrown by an earlier file (service or repository), and tell the browser the error type and message
        console.log(err)
        if(err === 'id format is not valid') {
            res.status(400).end(err) //send error code and error text (which is defined by `throw new Error`). 400 = invalid request
        } else {
            res.status(503).end(err) //send error code and error text. 503 = service not available
        }
    })
}

userController.storeStudent = (req, res) => {
    userService.storeStudent(req.body).then( (student) => {
        console.log('WHAT IS HAPPENDING ', student.username)
        res.end('student stored')
    })
    .catch( (err) => {
        console.log('ERROR: ', err)
        res.status(400).end(err)
    })
}

userController.updateStudent = (req, res) => {
    userService.updateStudent(req.body).then( (student)  => {
        res.end(student.username)
    })
    .then((student) => {
        if (!student){
            res.status(404).end('User does not exist')
        }else{
            res.status(200).end('User sucessfully updated')
        }
    })
    .catch ((err) => {
        console.log('ERROR: ', err)
        res.status(400).end(err)
    })
}

userController.deleteStudent = (req, res) => {
    userService.deleteStudent(req.params.username).then((data) => {
            res.status(204).end()
        })
        .catch((err) => {
            console.log(err)
            res.status(400).end('DELETE_FAILED')
        })
}


///////////////////////////////////////////////////
// CODE FOR STUDENT INFO ENDS HERE //////////////
/////////////////////////////////////////////////

/////////////////////////////////////////////////////
// CODE FOR TRANCSRIPT INFO STARTS HERE ////////////
///////////////////////////////////////////////////


userController.getTranscript = (req, res) => {
    userService.getTranscript(req.params.pdfContent)
    .then((transcript) => {
        if (!transcript) {
            res.status(404).end('The document you are trying to verify has not been authenticated by a guidance counselor')
        } else {
            res.status(200).end('This document has been authenticated!')
        }
    })
    .catch( err => { // 'catch' the error that was thrown by an earlier file (service or repository), and tell the browser the error type and message
        console.log(err)
        if(err === 'transcript format is not valid') {
            res.status(400).end(err) //send error code and error text (which is defined by `throw new Error`). 400 = invalid request
        } else {
            res.status(503).end(err) //send error code and error text. 503 = service not available
        }
    })
}

userController.storeTranscript = (req, res) => {
    userService.storeTranscript(req.body).then( (transcript) => {
        console.log('WHAT IS HAPPENDING ', transcript.pdfContent)
        res.end('transcript stored')
    })
    .catch( (err) => {
        console.log('ERROR: ', err)
        res.status(400).end(err)
    })
}

userController.updateTranscript = (req, res) => {
    userService.updateTranscript(req.body).then( (transcript)  => {
        res.end(transcript.pdfContent)
    })
    .then((transcript) => {
        if (!transcript){
            res.status(404).end('User does not exist')
        }else{
            res.status(200).end('User sucessfully updated')
        }
    })
    .catch ((err) => {
        console.log('ERROR: ', err)
        res.status(400).end(err)
    })
}

userController.deleteTranscript = (req, res) => {
    userService.deleteTranscript(req.params.pdfContent).then((data) => {
            res.status(204).end()
        })
        .catch((err) => {
            console.log(err)
            res.status(400).end('DELETE_FAILED')
        })
}

// userController.getTranscriptByUsername = (req, res) => {
//     userService.getTranscriptByUsername(req.body)
//     .then( (transcript) => {
//         res.end(transcript.hashValue)
//     })
// }


/////////////////////////////////////////////////////
// CODE FOR TRANSCRIPT INFO ENDS HERE //////////////
///////////////////////////////////////////////////


module.exports = userController