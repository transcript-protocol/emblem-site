const transcriptRepository = require('../repositories/transcript.repository')
const userRepository = require('../repositories/user.repository')
const blockchainRepository = require('../repositories/blockchain.repository')

const transcriptHashingUtils = require('../utils/transcript.hashing.util')
const transcriptParsingUtils = require('../utils/transcript.parsing.util')

const transcriptService = {}

//get transcript
transcriptService.getTranscript = id => {
  return userRepository.getUser(id)
    .then(user => {
      if (user.accountType === 'guidance') {
        console.log('GETTING TRANSCRIPTS ', user.schoolID)
        return transcriptRepository.getAllTranscripts(user.schoolID).then(transcripts => {
          console.log('TRANSCRIPTS', transcripts)
          return transcripts
        })
      } else if (user.accountType === 'student') {
        return transcriptRepository.getTranscript(user.transcriptHash)
      } else {
        throw new Error('User type must be "student" or "guidance"')
      }
    })
}

//create transcript
transcriptService.storeTranscripts = async (transcriptData, counselorId) => {
  const counselor = await userRepository.getUser(counselorId)

  if (counselor.accountType === 'student') {
    throw new Error('Uploader must be a guidance counselor.')
  }

  // const privateKey = keyStore.getPrivateKey(counselor._id)
  const privateKey = '540a5e193cebd774a1af02723ba5798d7ff2dec454a56bcd07aa5cf0e6d94ce7' // testing
  const parsedTranscripts = Promise.all(transcriptData.map( file => transcriptParsingUtils.getPdfInfo(file.buffer) ))

  return parsedTranscripts.then( transcripts => Promise.all(transcripts.map( transcript => {
    const { lastYearInSchool, firstName, lastName, middleName, dateOfBirth, joinedText } = transcript

    const hash = transcriptHashingUtils.hashTranscript(joinedText)
    const signature = transcriptHashingUtils.signTranscriptHash(hash, privateKey)

    return transcriptRepository.storeTranscript({ lastYearInSchool, firstName, lastName, middleName, dateOfBirth, hash, signature, schoolID: counselor.schoolID })
      .then( id => {
        return { id, hash, signature }
      })
  })))
  .then( hashSigs => Promise.all(hashSigs.map( hashSig => {
    const { hash, signature } = hashSig
    // return blockchainRepository.storeTranscriptInfo(hash, signature)
    return hash
  })))
  .then(txs => txs.map(tx => {
    // store tx hash in the DB for future confirmation
    return tx
  }))
  .catch(err => {
    console.log('ERROR STORING TRANSCRIPT: ', err)
    throw new Error(err)
  })
}

transcriptService.updateTranscript = (transcriptInfo) => {
  return transcriptRepository.updateTranscript(transcriptInfo)
}

transcriptService.deleteTranscript = async (id, hash) => {
  const [ user, transcript ] = await Promise.all([userRepository.getUser(id), transcriptRepository.getTranscript(hash)])
  const validGuidance = user.accountType === 'guidance' && user.schoolID === transcript.schoolID
  const validStudent = user.accountType === 'student' && user.transcriptHash === hash
  if ( validGuidance || validStudent ) {
    return transcriptRepository.deleteTranscript(hash)
  } else {
    throw new Error('User is not authorized to delete this transcript.')
  }
}

transcriptService.searchTranscripts = (studentInfo) => {
  return transcriptRepository.searchTranscripts(studentInfo)
}

module.exports = transcriptService
