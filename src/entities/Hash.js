const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt-nodejs');

//should be connection for everything vvvvv
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost/transcript')
// mongoose.connect('mongodb://localhost/transcript')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    console.log('HASH SCHEMA CONNECTED') //just change for whatever schema you're connecting
});
// should be mongoose connection for everything in ANY PROJECT EVER^^^^

const Schema = mongoose.Schema
const HashSchema = new Schema({
  
  hashValue: { //hash of transcript pdf contents
    type: String,
    required: true,
    // index: { unique: true }
  },

  username: { //matches an email in users, used to see who issued the transcript hash
    type: String,
    required: true,
  },
  
  studentUsername: { //username of the student the transcript belongs to
    type: String,
    required: true
  },

  schoolID: {
    type: String, 
    required: true
  },

  sequence: Number,
  updatedAt: { type: Date, default: Date.now }
})


module.exports = mongoose.model('Hash', HashSchema)
