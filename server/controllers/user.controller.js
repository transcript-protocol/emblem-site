const userService = require('../services/user.service')
const authUtils = require('../utils/auth.util')

const userController = {}

userController.getUser = (req, res) => {
    authUtils.verifyToken(req)
    .then( data => {
        const { id } = data
        return userService.getUser(id)
    })
    .then( user => {
        res.status(200).json(user)
    })
    .catch( err => { // 'catch' the error that was thrown by an earlier file (service or repository), and tell the browser the error type and message
        err = err.toString()
        console.log('[GET] USER ERROR: ', err)
        if ( err.includes('Id format is not valid')) {
            res.status(400).json(err) //send error code and error text (which is defined by `throw new Error`). 400 = invalid request
        } else if ( err.includes('No token provided.') ||  err.includes('Failed to authenticate token.')) {
            res.status(401).json(err) //send error code and error text. 401 = not authorized
        } else if (err.includes('User does not exist')) {
            res.status(404).end(err)
        } else {
            res.status(503).json(err) //send error code and error text. 503 = service not available
        }
    })
}

userController.storeUser = (req, res) => {
    userService.storeUser(req.body).then( authData => {
        res.json(authData)
    })
    .catch( err => {
        console.log('[POST] STORE USER ERROR: ', err)
        res.status(400).json(err)
    })
}

userController.updateUser = (req, res) => {
    authUtils.verifyToken(req)
    .then( data => {
        const { id } = data

        if (id !== req.body.id) {
            throw new Error('User and token do not match.')
        }
        return userService.updateUser(req.body)
    })
    .then( user => {
        if (!user){
            res.status(404).end('User does not exist')
        } else {
            res.status(204).end('User sucessfully updated')
        }
    })
    .catch ( err => {
        err = err.toString()
        if ( err.includes('No token provided.') ||  err.includes('Failed to authenticate token.') || err.includes('User and token do not match') ||  err.includes('Uploader must be a guidance counselor.') ) {
            res.status(401).json(err) //send error code and error text. 401 = not authorized
        } else {
            res.status(400).json(err)
        }
    })
}

userController.deleteUser = (req, res) => {
    authUtils.verifyToken(req)
    .then( data => {
        const { id } = data
        return userService.deleteUser(id)
    })
    .then( () => {
        res.status(204).end()
    })
    .catch( err => {
        console.log('[DELETE] USER ERROR: ', err)
        res.status(400).end('DELETE_FAILED')
    })
}

userController.loginUser = (req, res) => {
    userService.loginUser(req.body).then( authData => {
        console.log('USER LOGGED IN ', authData)
        res.json(authData) //defaults to 200
    })
    .catch( err => {
        console.log('[POST] LOGIN USER ERROR: ', err)
        res.status(401).end('USER NOT AUTHORIZED')
    })
}

//THIS IS JUST FOR TESTING PURPOSES TO SHOW DATABASE ENTRIES BY USERNAME! NOT TO BE DEPLOYED
userController.findUser = (req, res) => {
    var user = userService.findUser(req.params.username)
    .then((user) => {
        if (!user) {
            res.status(404).end('user  does not exist')
        } else {
            // console.log(user)
            // user = res.end(JSON.stringify(user))
            // console.log('WTF is going on?', user)
            res.status(200).end("got user!!")
        }
    })
    .catch( err => { // 'catch' the error that was thrown by an earlier file (service or repository), and tell the browser the error type and message
        console.log(err)
        if ( err.includes('id format is not valid')) {
            res.status(400).json(err) //send error code and error text (which is defined by `throw new Error`). 400 = invalid request
        } else {
            res.status(503).json(err) //send error code and error text. 503 = service not available
        }
    })
}

module.exports = userController
