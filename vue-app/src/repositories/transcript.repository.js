import { makeRequest, auth } from './lib/helpers'

export default class TranscriptRepository {
  uploadTranscripts (transcriptData) {
    const options = {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'x-access-token': auth.token
      },
      body: transcriptData
    }
    return makeRequest('/transcript', options)
  }
}
