// integration tests for the EmblemEDU Server

const assert = require('assert')
const request = require('supertest')
const ethUtil = require('ethereumjs-util')

const server = require('../server.js')
const Transcript = require('../entities/Transcript')
const School = require('../entities/School')

// NOTE: These tests require a running MongoDB instance
describe('HTTP Server', function() {
    describe('/user', function() {
        const user1 = {
            username: 'euler@python.com',
            password: 's1ckv1b3z',
            accountType: 'student',
            firstName: 'MARY',
            lastName: 'JANE',
            dateOfBirth: '10022001',
            schoolID: '1325145',
            acceptedTerms: true
        }

        const user2 = {
            username: 'euler@python.com',
            password: 'h3llach1ll',
            accountType: 'student',
            firstName: 'JANE',
            lastName: 'DOE',
            dateOfBirth: '10022001',
            schoolID: '1325145',
            acceptedTerms: true
        }

        const login1 = {
            username: 'euler@python.com',
            password: 's1ckv1b3z'
        }

        let authToken1 = ''

        it('should return 401 when a user is not authorized', function(done) { //this is how mocha expects HTTP requests to be written: with a done parameter to the function
            request(server).get('/user').expect(401, done)
        })
        
        it('should return 200 and an auth token for a successfully added user', function(done) {
            request(server).post('/user').send(user1).expect(200)
            .set('Accept', 'application/json')
            .then( res => {
                authToken1 = res.body.token
                assert.equal(res.body.auth, true)
                done()
            })
        })

        it('should send back an access token on successful login', function(done) {
            request(server).post('/user/login').send(login1).expect(200)
            .set('Accept', 'application/json')
            .then( res => {
                authToken1 = res.body.token
                assert.equal(res.body.auth, true)
                done()
            })
        })

        it('should return 200 for successfully getting a user', function(done) { //this is how mocha expects HTTP requests to be written: with a done parameter to the function
            request(server).get('/user')
            .set('x-access-token', authToken1).expect(200)
            .then( res => {
                user2.id = res.body.id
                done()
            })
        })

        it('should return 204 for successfully updated user', function(done){
            request(server).put('/user').send(user2).set('x-access-token', authToken1).expect(204, done)
        })
        
        it('should return 204 for successfully deleted user', function(done) {
            request(server).delete('/user').set('x-access-token', authToken1).expect(204, done)
        }) 
    })

    describe('/transcript', function() {
        let guidanceAuthToken = ''
        let studentAuthToken = ''
        let transcriptHash = '9661c20e0102dfa24be0febd7122793b457a4948749d2a4a216fc1aa32ec560f'

        const submittingGuidance = {
            username: 'euler@python.com',
            password: 's1ckv1b3z',
            accountType: 'guidance',
            firstName: 'MARY',
            lastName: 'JANE',
            dateOfBirth: '10022001',
            schoolID: '1325145',
            acceptedTerms: true
        }
        const matchingStudent = {
            username: 'euler@java.com',
            password: 'h3llach1ll',
            accountType: 'student',
            firstName: 'ANNA',
            lastName: 'CUDDEBACK',
            lastYearInSchool: '2018',
            dateOfBirth: '10/04/1999',
            schoolID: '1325145',
            acceptedTerms: true
        }
        const login1 = {
            username: 'euler@python.com',
            password: 's1ckv1b3z'
        }

        const transcriptQuery = {
            firstName: 'ANNA',
            lastName: 'CUDDEBACK',
            dateOfBirth: '10/04/1999',
            lastYearInSchool: '2018',
            schoolID: '1325145'
        }

        it('should return 401 if a user has invalid credentials', function(done) {
            request(server).get('/transcript')
            .set('x-access-token', '')
            .expect(401, done)
        })

        it('should return 200 and an auth token for a successfully added guidance user', function(done) {
            request(server).post('/user').send(submittingGuidance).expect(200)
            .set('Accept', 'application/json')
            .then( res => {
                guidanceAuthToken = res.body.token
                assert.equal(res.body.auth, true)
                done()
            })
        })

        it('should return 404 if a user has no transcripts', function(done) {
            request(server).get('/transcript')
            .set('x-access-token', guidanceAuthToken)
            .expect(404, done)
        })

        it('should return null if no transcript matches some student information', function(done) {
            request(server).post('/transcript/search').send(transcriptQuery).expect(404)
            .then( res => {
                assert.equal(res.body, null)
                done()
            })
        })

        it('should return 204 for uploading transcripts', function(done) { //this is how mocha expects HTTP requests to be written: with a done parameter to the function
            request(server).post('/transcript').set('x-access-token', guidanceAuthToken)
            .attach('transcripts', './test/files/test_transcript1.pdf').expect(204, done)
        })

        it('should return a list of transcripts for a guidance counselor', function(done) {
            request(server).get('/transcript').expect(200)
            .set('x-access-token', guidanceAuthToken)
            .then( res => {
                assert.equal(res.body.length, 1)
                done()
            })
        })

        it('should return the transcript hash if a transcript matches some student information', function(done) {
            request(server).post('/transcript/search').send(transcriptQuery).expect(200)
            .then( res => {
                assert.equal(res.body, transcriptHash)
                done()
            })
        })

        it('should return 200 and an auth token for a successfully added student user', function(done) {
            request(server).post('/user').send(matchingStudent).expect(200)
            .set('Accept', 'application/json')
            .then( res => {
                studentAuthToken = res.body.token
                assert.equal(res.body.auth, true)
                done()
            })
        })

        it('should associate a transcript with a student when they create an account', function(done) {
            request(server).get('/transcript')
            .set('x-access-token', studentAuthToken)
            .then( res => {
                assert.equal(res.body.hash, transcriptHash)
                done()
            })
        })

        it('should return 204 for successfully deleted transcript', function(done) {
            request(server).delete('/transcript/' + transcriptHash).set('x-access-token', guidanceAuthToken).expect(204, done)
        }) 

        it('should return 204 for a successfully deleted user', function(done) {
            request(server).delete('/user').set('x-access-token', guidanceAuthToken).expect(204, done)
        })

        it('should return 204 for a successfully deleted user', function(done) {
            request(server).delete('/user').set('x-access-token', studentAuthToken).expect(204, done)
        })
    })

    xdescribe('/school', function() {
        const school1 = {
            schoolID: '12345',
            schoolName: 'Hawkins',
            addrLn1: '47 Pitcher Ave',
            city: 'Medford',
            state: 'MA', 
            zip: '02155'
        }

        const student3 ={
            username: 'euler@python.com',
            firstName: 'Scott',
            middleName: 'ST',
            lastName: 'Clarke', 
            dateOfBirth: '10041952',
            schoolID: '22345',
            previousSchoolIDs: ['12456', '12567']
        }

        const school2 = {
            schoolID: '12345',
            schoolName: 'Hawkins',
            addrLn1: '24 Sagamore Ave',
            addrLn2: 'PO BOX 223',
            city: 'Medford',
            state: 'MA', 
            zip: '02155'
        }

        // just to make sure all the stuff from previous tests got cleared
        it('should return 204 for successfully deleted school', function(done) {
            request(server).delete('/school/12345').expect(204, done)
        })

        //just to make sure all the stuff from previous tests got cleared
        it('should return 204 for successfully deleted school', function(done) {
            request(server).delete('/school/22345').expect(204, done)
        })


        it('should return 404 for a school that doesnt exist', function(done) { //this is how mocha expects HTTP requests to be written: with a done parameter to the function
            request(server).get('/school/12345').expect(404, done)
        })
        
        it('should return 200 for successfullly added school', function(done) {
            request(server).post('/school').send(school1).expect(200, done)
        })

        it('should return 200 for getting school', function(done) { //this is how mocha expects HTTP requests to be written: with a done parameter to the function
            request(server).get('/school/12345').expect(200, done)
        })

        it('should return 200 for successfully updated school', function(done){
            request(server).put('/school/12345').send(school2).expect(200, done)
        })
        
        it('should return 204 for successfully deleted school', function(done) {
            request(server).delete('/school/22345').expect(204, done)
        })
    })
})
