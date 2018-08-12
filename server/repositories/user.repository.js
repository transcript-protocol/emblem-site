// talks to the database / calls outside of the server
// all Web3.js to call solidity contracts will happen here

const User = require('../entities/User')

const userRepository = {}

userRepository.getUser = id => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        return User.findById(id)
    }
    throw new Error('id format is not valid')
}

userRepository.storeUser = userInfo => {
    console.log('CLIENT INPUT: ', userInfo)
    const newUser = new User(userInfo)
    return newUser.save()
    .then( user => {
        console.log('USER CREATED: ', user.username)
        return user._id
    })
}

userRepository.updateUser = userInfo => {
    return User.findById(userInfo.id)
    .then( user => {
        console.log('CLIENT INPUT: ', userInfo)
        return user.set(userInfo).save()
    }).then( user => {
        console.log('USER UPDATED: ', user.username)
        return user
    })
}

userRepository.loginUser = userInfo => {
    username = userInfo.username
    password = userInfo.password
    return User.findOne({ username })
    .then( user => user.comparePassword(password) ) //terniary operator
    .then( data => {
        const { passwordMatch, id } = data

        if(!passwordMatch) {
            throw new Error("Password doesn't match") //ends here because it's throwing an error (i.e. it has a return)
        }
        return id //return the user's id to generate the token if there is a match
    })
}

userRepository.deleteUser = id => {
    return User.findById(id).remove()
}

//THIS IS JUST FOR TESTING PURPOSES TO SHOW DATABASE ENTRIES BY USERNAME! NOT TO BE DEPLOYED
userRepository.findUser = username => {
    username = username
    return User.findOne({ username })
}

module.exports = userRepository
