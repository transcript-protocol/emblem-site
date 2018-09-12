const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt-nodejs')

const database = process.env.EMBLEM_DATABASE

const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
mongoose.connect(`mongodb://localhost/${database}`)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    console.log('USER SCHEMA CONNECTED') //just change for whatever schema you're connecting
});
// should be mongoose connection for everything in ANY PROJECT EVER^^^^

const Schema = mongoose.Schema
const UserSchema = new Schema({
    username: { //suggest school email for GC and not school email for student
        type: String,
        required: true,
        index: { unique: true }
    },

    password: {
        type: String,
        required: true
    },

    accountType: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },

    middleName: {
        type: String
    },

    lastName: {
        type: String,
        required: true
    },

    dateOfBirth: {
        type: String,
        required: true
    },

    lastYearInSchool: {
        type: String,
        required: false
    },

    schoolID: {
        type: String, 
        required: true
    },

    previousSchoolIDs: {
        type: Array
    },
    
    acceptedTerms: {
        type: Boolean,
        required: true
    },

    transcriptHash: {
        type: String
    },
    
    sequence: Number,
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
})

UserSchema.pre('save', function(next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
        return next();
    }

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
            return next(err);
        }

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {
                return next(err);
            }

            // override the cleartext password with the hashed one
            user.password = hash;
            return next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, (err, passwordMatch) => {
            if (err) reject(err)
            resolve({ passwordMatch, id: this._id })
        })
    })
}

module.exports = mongoose.model('User', UserSchema)
