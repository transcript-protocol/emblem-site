const database = process.env.EMBLEM_DATABASE

const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
mongoose.connect(`mongodb://localhost/${database}`)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    console.log('TRANSCRIPT SCHEMA CONNECTED') //just change for whatever schema you're connecting
});
// should be mongoose connection for everything in ANY PROJECT EVER^^^^

const Schema = mongoose.Schema
const TranscriptSchema = new Schema({
  
  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  middleName: {
    type: String,
  },

  dateOfBirth: {
    type: String,
    required: true
  },

  lastYearInSchool: {
    type: String,
    required: true
  },

  schoolID: {
    type: String,
    required: true
  },

  hash: {
    type: String,
    required: true,
    index: { unique: true }
  },

  signature: {
    type: String,
    required: true
  },

  writtenToBlockchain: {
    type: Boolean,
    default: false
  },

  sequence: Number,
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Transcript', TranscriptSchema)
