<template>
  <div class="container centered-column">
    <div class="col-lg-5 col-md-6 col-sm-7 col-xs-12">
      <form id="upload-form" enctype="multipart/form-data" class="centered-column" @submit.prevent="uploadTranscripts">
        <h2>Upload Transcripts</h2>
        <div class="dropbox centered-column-center">
          <p v-if="!transcriptData.length">
              Drag your file(s) here to begin<br> or click to browse
          </p>
          <input type="file" class="input-file" multiple :disabled="isSaving" :name="uploadFieldName" accept="application/pdf" v-on:change="handleFile($event.target.files); fileCount=$event.target.files.length">
          <ul class="transcripts">
            <li v-for="attachment in attachments" :key="attachment.name">
              {{ attachment.name }}
            </li>
          </ul>
        </div>
        <button type="submit">UPLOAD</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Upload',

  data () {
    return {
      studentUsername: '',
      fileCount: 0,
      isSaving: false,
      uploadFieldName: 'transcripts',
      transcriptData: new FormData(),
      attachments: []
    }
  },

  methods: {
    handleFile (files) {
      for (let i = files.length - 1; i >= 0; i--) {
        this.attachments.push({file: files[i], name: files[i].name})
      }
    },
    prepareTranscripts () {
      this.attachments.forEach(transcript => this.transcriptData.append(this.uploadFieldName, transcript.file))
    },
    uploadTranscripts () {
      this.prepareTranscripts()
      console.log(this.transcriptData.getAll('transcripts'))
      this.$store.dispatch('transcript/uploadTranscripts', this.transcriptData)
        .then(success => {
          this.transcriptData = new FormData()
          this.attachments = []
        })
    }
  }
}
</script>
