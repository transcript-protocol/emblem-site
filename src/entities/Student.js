
//should be connection for everything vvvvv
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost/transcript')
// mongoose.connect('mongodb://localhost/transcript')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    console.log('STUDENT SCHEMA CONNECTED') //just change for whatever schema you're connecting
});
// should be mongoose connection for everything in ANY PROJECT EVER^^^^

const Schema = mongoose.Schema
const StudentSchema = new Schema({
    username: { //matches an email in users, aken from one html field
      type: String,
      required: true,
      index: { unique: true }
    },
    
    firstName: { //suggest school email for GC and not school email for student
          type: String,
          required: true
      },

    middleName: { //suggest school email for GC and not school email for student
        type: String
    },

    lastName: { //suggest school email for GC and not school email for student
        type: String,
        required: true
    },

    userDOB: { //suggest school email for GC and not school email for student
        type: String,
        required: true
    },

    schoolID: {
      type: String, 
      required: true
    },

    previousSchoolIDs: {
      type: Array
    },

    sequence: Number,
    updatedAt: { type: Date, default: Date.now }
})




module.exports = mongoose.model('Student', StudentSchema)
