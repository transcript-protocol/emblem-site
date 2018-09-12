const Transcript = require('../entities/Transcript')

const transcriptRepository = {}

transcriptRepository.getTranscript = hash => Transcript.findOne({ hash })

transcriptRepository.getAllTranscripts = schoolID => Transcript.find({ schoolID })

transcriptRepository.storeTranscript = (transcriptInfo) => {
    const newTranscript = new Transcript(transcriptInfo)
    return newTranscript.save()
    .then( transcript => {
        console.log('TRANSCRIPT ENTRY: ', transcript)
        return transcript
    })
}

transcriptRepository.updateTranscript = (transcriptUpdate) => {
    return Transcript.findOne({ hash: transcriptUpdate.oldHash })
    .then( transcript => transcript.set(transcriptUpdate).save())
    .then( transcript => {
        console.log('TRANSCRIPT UPDATE: ', transcriptUpdate)
        return transcript
    })
}

transcriptRepository.deleteTranscript = (hash) => {
    return Transcript.findOne({ hash }).remove()
    .then(status => {
        console.log('TRANSCRIPT DELETED: ', status)
        return status
    })
}

transcriptRepository.searchTranscripts = (studentInfo) => {
    return Transcript.findOne(studentInfo)
}

module.exports = transcriptRepository
