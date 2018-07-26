// talks to the database / calls outside of the server
// all Web3.js to call solidity contracts will happen here

/*
Written by Andy Cuddeback for EmblemEDU
Github: acuddeback
Updated 07/23/18
Property of EmblemEDU

Notes on the code:
In this document, 'hash' refers to thw whole hash JS object whereas 'hashValue' refers to the hash itself. 

Example: 

const guidance1 ={
    hashValue: 'cbe3d16cc9f5cef09648e350a1abfbd4a3fb02b7a7f1cd6c02c23b5ee9857e58',
    username: 'euler@python.com'
    studentUsername: 'student@emblemEDU.com'
}

*/

const Hash = require('../entities/Hash')

const hashRepository = {}

hashRepository.getHash = (hashValue) => { //find object by hash
    return Hash.findOne({ hashValue })
}

hashRepository.storeHash = (hashInfo) => { //input whole object
    console.log('CLIENT INPUT: ', hashInfo)
    const newHash = new Hash(hashInfo)
    return newHash.save()
    .then( hash => {
        console.log('DATABASE ENTRY:', hash)
        return hash
    })
}

hashRepository.updateHash = (hashInfo) => { //update whole object
    return Hash.findOne({ hashValue: hashInfo.hashValue })
    .then( hash => {
        console.log('CLIENT INPUT: ', hashInfo)
        return hash.set(hashInfo).save()
    }).then( hash => {
        console.log('HERE ', hash) 
        return hash
    })
}


hashRepository.deleteHash = (hashValue) => { //delete object by hash. potentially never use this feature.
    return Hash.findOne({ hashValue }).remove()
}

module.exports = hashRepository
