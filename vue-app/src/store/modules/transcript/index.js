import TranscriptRepository from '../../../repositories/transcript.repository'

const transcriptRepo = new TranscriptRepository()

const state = {

}

// getters
const getters = {
  // the underscore means that the parameter is not used by the function

}

// actions
const actions = {
  uploadTranscripts: ({ commit, state }, transcriptData) => {
    console.log('UPLOADING TRANSCRIPTS ', transcriptData)
    commit('loader/setLoading', true)
    transcriptRepo.uploadTranscripts(transcriptData)
      .then(data => console.log('UPLOAD SUCCESS'))
      .catch(err => console.log('ERROR UPLOADING TRANSCRIPTS: ', err))
      .finally(() => commit('loader/setLoading', true))
  },

  verifyTranscript: ({ commit, state }, transcriptHash) => {

  }
}

// mutations
const mutations = {
  setLoading (state, isLoading) {
    state.isLoading = isLoading
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
