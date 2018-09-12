const transcriptService = require('../services/transcript.service')
const authUtils = require('../utils/auth.util')

const transcriptController = {}

transcriptController.getTranscript = (req, res) => {
    authUtils.verifyToken(req)
    .then( data => {
        const { id } = data
        return transcriptService.getTranscript(id)
    })
    .then( transcripts => {
        if (!transcripts || (transcripts instanceof Array && !transcripts.length)) {
            res.status(404).end('User does not have a transcript')
        } else {
            res.json(transcripts)
        }
    })
    .catch ( err => {
        if (err.includes('No token provided.') || err.includes('Failed to authenticate token.')) {
            res.status(401).json(err) //send error code and error text. 401 = not authorized
        } else {
          res.status(400).json(err)
        }
    })
}

transcriptController.storeTranscripts = (req, res) => {
    console.log('GOT A REQUEST TO STORE', req.files)
    authUtils.verifyToken(req)
    .then( data => {
        const { id } = data
        return transcriptService.storeTranscripts(req.files, id)
    })
    .then( data => {
        res.status(204).end('transcript stored')
    })
    .catch ( err => {
        err = err.toString()
        if ( err.includes('No token provided.') || err.includes('Failed to authenticate token.') || err.includes('Uploader must be a guidance counselor.') ) {
            res.status(401).json(err)
        } else if ( err.includes('Failure storing transcripts.') ) {
            res.status(503).json(err)
        } else {
            res.status(400).json(err)
        }
    })
}

transcriptController.updateTranscript = (req, res) => {
    transcriptService.updateTranscript(req.body).then( (transcript)  => {
        res.end(transcript.pdfContent)
    })
    .then((transcript) => {
        if (!transcript){
            res.status(404).end('User does not exist')
        } else {
            res.status(200).end('User sucessfully updated')
        }
    })
    .catch ( err => {
        console.log('ERROR: ', err)
        res.status(400).json(err)
    })
}

transcriptController.deleteTranscript = (req, res) => {
    authUtils.verifyToken(req)
        .then( data => {
            const { id } = data
            return transcriptService.deleteTranscript(id, req.params.hash)
        })
        .then( _data => {
            res.status(204).end()
        })
        .catch( err => {
            if (err.includes('No token provided.') || err.includes('Failed to authenticate token.') || err.includes('User is not authorized to delete this transcript.')) {
                res.status(401).end(err)
            } else {
                console.log(err)
                res.status(400).end('DELETE_FAILED')
            }
        })
}

transcriptController.searchTranscripts = (req, res) => {
    transcriptService.searchTranscripts(req.body)
        .then( data => {
            console.log('LOOKING FOR A TRANSCRIPT ', data)
            if (!data) {
                res.status(404).json(null)
            } else {
                res.status(200).json(data.hash)
            }
        })
        .catch( err => {
            res.status(503).end('No matching transcript found')
        })
}

module.exports = transcriptController
