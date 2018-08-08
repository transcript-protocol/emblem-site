// talks to the database / calls outside of the server
// all Web3.js to call solidity contracts will happen here

/*
Written by Andy Cuddeback for EmblemEDU
Github: acuddeback
Updated 07/23/18
Property of EmblemEDU

Notes on the code:
In this document, 'hash' refers to thw whole hash JS object whereas 'pdfContent' refers to the hash itself. 

Example: 

const guidance1 ={
    pdfContent: 'cbe3d16cc9f5cef09648e350a1abfbd4a3fb02b7a7f1cd6c02c23b5ee9857e58',
    username: 'euler@python.com'
    studentUsername: 'student@emblemEDU.com'
}

*/

const Transcript = require('../entities/Transcript')

const transcriptRepository = {}

transcriptRepository.getTranscript = (pdfContent) => { //find object by pdf contents
    return Transcript.findOne({ pdfContent: pdfContent })
}

transcriptRepository.storeTranscript = (transcriptInfo) => { //input whole object
    const newTranscript = new Transcript(transcriptInfo)
    return newTranscript.save()
    .then( transcript => {
        console.log('DATABASE ENTRY:', transcript)
        return transcript
    })
}

transcriptRepository.updateTranscript = (transcriptInfo) => { //update whole object
    return Transcript.findOne({ pdfContent: transcriptInfo.pdfContent })
    .then( transcript => {
        console.log('CLIENT INPUT: ', transcriptInfo)
        return transcript.set(transcriptInfo).save()
    }).then( transcript => {
        console.log('HERE ', transcript) 
        return transcript
    })
}

transcriptRepository.deleteTranscript = (pdfContent) => { //delete object by pdf contents. potentially never use this feature.
    return Transcript.findOne({ pdfContent: pdfContent }).remove()
    .then(status => {
        console.log(status)
        return status
    })
}

// transcriptRepository.getTranscriptByUsername = (username) => {
//     return Transcript.find({ username })
//     .then( transcript => {
//         console.log('ALL TRANSCRIPTS: ', transcript)
//         return transcript
//     })
// }
module.exports = transcriptRepository
