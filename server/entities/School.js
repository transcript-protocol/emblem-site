const database = process.env.EMBLEM_DATABASE

const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
mongoose.connect(`mongodb://localhost/${database}`)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    console.log('SCHOOL SCHEMA CONNECTED') //just change for whatever schema you're connecting
});
// should be mongoose connection for everything in ANY PROJECT EVER^^^^

const Schema = mongoose.Schema
const SchoolSchema = new Schema({
    schoolID: { //matches an email in users, aken from one json field
      type: String,
      required: true,
      index: { unique: true }
    },
    
    schoolName: { //suggest school email for GC and not school email for school
          type: String,
          required: true
      },

    addrLn1: { //suggest school email for GC and not school email for school
        type: String,
        required: true
    },

    addrLn2: { //suggest school email for GC and not school email for school
        type: String
    },

    city: { //suggest school email for GC and not school email for school
        type: String,
        required: true
    },

    state: {
      type: String, 
      required: true
    },
    
    zip: {
      type: String, 
      required: true
    },

    previousSchoolIDs: {
      type: Array
    },

    sequence: Number,
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('School', SchoolSchema)
