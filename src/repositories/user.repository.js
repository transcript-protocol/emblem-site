// talks to the database / calls outside of the server
// all Web3.js to call solidity contracts will happen here

const User = require('../entities/User')

const userRepository = {}

userRepository.getUser = (username) => {
    //if (id.match(/^[0-9a-fA-F]{24}$/)) {
        return User.findOne({ username })
    //}
    //throw new Error('id format is not valid')
}

userRepository.storeUser = (userInfo) => {
    console.log('CLIENT INPUT: ', userInfo)
    const newUser = new User(userInfo)
    return newUser.save()
    .then( user => {
        console.log('DATABASE ENTRY:', user)
        return user
    })
}

userRepository.updateUser = (userInfo) => {
    return User.findOne({ username: userInfo.username })
    .then( user => {
        console.log('CLIENT INPUT: ', userInfo)
        return user.set(userInfo).save()
    }).then( user => {
        console.log('DATABASE ENTRY ', user)
        return user
    })
}


userRepository.deleteUser = (username) => {
    return User.findOne({ username }).remove()
}

module.exports = userRepository
