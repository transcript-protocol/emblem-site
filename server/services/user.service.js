// handles all the logic between the controller and the repository
//

/*
Written by Andy Cuddeback for EmblemEDU
Github: acuddeback
Updated 07/23/18
Property of EmblemEDU
*/

const userRepository = require('../repositories/user.repository')
const transcriptRepository = require('../repositories/transcript.repository')

const keccak256 = require('js-sha3').keccak256;
const authUtils = require('../utils/auth.util')
const UserDTO = require('../dto/user.dto')

const userService = {}

userService.getUser = id => {
    return userRepository.getUser(id).then( user => new UserDTO(user) )
}

userService.storeUser = userInfo => {
    if(userInfo.accountType === 'guidance') {
        if(userInfo.code === null) {
            throw new Error('Guidance counselor code not valid')
        }
        return userRepository.storeUser(userInfo).then( id => authUtils.generateToken(id) )

    } else if(userInfo.accountType === 'student') {
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

////////////////////////////////////////////////////
// CODE FOR USER ACCOUNT INFO ENDS HERE ///////////
//////////////////////////////////////////////////

///////////////////////////////////////////////
// CODE FOR HASH INFO STARTS HERE ////////////
/////////////////////////////////////////////

/*
In this document, 'hash' refers to thw whole hash JS object whereas 'pdfContent' refers to the hash itself. 

Example: 

const guidance1 ={
    pdfContent: 'cbe3d16cc9f5cef09648e350a1abfbd4a3fb02b7a7f1cd6c02c23b5ee9857e58',
    username: 'euler@python.com'
    studentUsername: 'student@emblemEDU.com'

}
*/


//get transcript
userService.getTranscript = (pdfContent) => {
    pdfContent = keccak256(pdfContent) // hashes pdf content for query
    return transcriptRepository.getTranscript(pdfContent)
}

//create transcript
userService.storeTranscript = (transcriptInfo) => {
    console.log('CLIENT INPUT: ', transcriptInfo)
    //get pdfContent from transcriptInfo and hash it, then resave it here
    console.log('OLD CONTENT HERE:', transcriptInfo.pdfContent)
    transcriptInfo.pdfContent = keccak256(transcriptInfo.pdfContent) //hashes pdf content for query
    console.log('NEW pdfContent HERE: ', transcriptInfo.pdfContent)
    return transcriptRepository.storeTranscript(transcriptInfo)
}

//update transcript
userService.updateTranscript = (transcriptInfo) => {
    ranscriptInfo.pdfContent = keccak256(transcriptInfo.pdfContent) //hashes pdf content for query
    return transcriptRepository.updateTranscript(transcriptInfo)
}    
//delete transcript
userService.deleteTranscript = (pdfContent) => {
    pdfContent = keccak256(pdfContent) //hashes pdf content for query
    return transcriptRepository.deleteTranscript(pdfContent)
}



// userService.getTranscriptByUsername = (username) => {
//     return transcriptRepository.getTranscriptByUsername(username)
// }

///////////////////////////////////////////////
// CODE FOR transcript INFO ENDS HERE //////////////
/////////////////////////////////////////////

module.exports = userService

