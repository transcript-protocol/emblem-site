/*
Written by Andy Cuddeback for EmblemEDU
Github: acuddeback
Updated 07/23/18
Property of EmblemEDU
*/

const userRepository = require('../repositories/user.repository')
const transcriptRepository = require('../repositories/transcript.repository')

const authUtils = require('../utils/auth.util')
const UserDTO = require('../dto/user.dto')

const userService = {}

userService.getUser = id => {
    return userRepository.getUser(id).then( user => {
        if (user) {
            return new UserDTO(user)
        } else {
            throw new Error('User does not exist')
        }
    })
}

userService.storeUser = async (userInfo) => {
    if(userInfo.accountType === 'guidance') {
        if(userInfo.code === null) {
            throw new Error('Guidance counselor code not valid')
        }
        return userRepository.storeUser(userInfo).then( id => authUtils.generateToken(id) )
    } else if(userInfo.accountType === 'student') {
        const { firstName, lastName, lastYearInSchool, schoolID, dateOfBirth } = userInfo
        const transcript = await transcriptRepository.searchTranscripts({ firstName: firstName.toUpperCase(), lastName: lastName.toUpperCase(),
            lastYearInSchool, schoolID, dateOfBirth })

        if (transcript) {
            userInfo.transcriptHash = transcript.hash
        }

        return userRepository.storeUser(userInfo).then( id => authUtils.generateToken(id) )
    } else {
        throw new Error('userType must be "student" or "guidance"')
    }
}

userService.updateUser = userInfo => {
    return userRepository.updateUser(userInfo)
}

userService.deleteUser = id => {
    return userRepository.deleteUser(id)
}

userService.loginUser = userInfo => {
    return userRepository.loginUser(userInfo)
    .then( id => {
        return authUtils.generateToken(id)
    })
}

//THIS IS JUST FOR TESTING PURPOSES TO SHOW DATABASE ENTRIES BY USERNAME! NOT TO BE DEPLOYED
userService.findUser = username => {
    return userRepository.findUser(username)
}

module.exports = userService

