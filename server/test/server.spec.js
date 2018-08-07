const assert = require('assert')
const request = require('supertest')
const ethUtil = require('ethereumjs-util')

const server = require('../server.js')
const Transcript = require('../entities/Transcript')
const School = require('../entities/School')

describe('HTTP Server', function() {
    describe('/user', function() {
        const user1 = {
            username: 'euler@python.com',
            password: 's1ckv1b3z',
            accountType: 'student',
            firstName: 'MARY',
            lastName: 'JANE',
            userDOB: '10022001',
            schoolID: '1325145'
        }

        const user2 = {
            username: 'euler@python.com',
            password: 'h3llach1ll',
            accountType: 'student',
            firstName: 'JANE',
            lastName: 'DOE',
            userDOB: '10022001',
            schoolID: '1325145'
        }

        const login1 = {
            username: 'euler@python.com',
            password: 's1ckv1b3z'
        }

        let authToken1 = ''

        it('should return 401 when a user is not authorized', function(done) { //this is how mocha expects HTTP requests to be written: with a done parameter to the function
            request(server).get('/user').expect(401, done)
        })
        
        it('should return 200 and an auth token for a sucessfully added user', function(done) {
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

        it('should return 200 for sucessfully getting a user', function(done) { //this is how mocha expects HTTP requests to be written: with a done parameter to the function
            request(server).get('/user').set('x-access-token', authToken1).expect(200)
            .then( res => {
                user2.id = res.body.id
                done()
            })
        })

        it('should return 204 for sucessfully updated user', function(done){
            request(server).put('/user').send(user2).set('x-access-token', authToken1).expect(200, done)
        })
        
        it('should return 204 for sucessfully deleted user', function(done) {
            request(server).delete('/user').set('x-access-token', authToken1).expect(204, done)
        }) 
    })

    // describe('/guidance', function() {

    //     const guidance1 ={
    //         username: 'euler@python.com',
    //         firstName: 'Scott',
    //         middleName: 'ST',
    //         lastName: 'Clarke', 
    //         userDOB: '10041952',
    //         schoolID: '12345'
    //     }

    //     const guidance2 ={
    //         username: 'euler@python.com',
    //         firstName: 'Russel',
    //         middleName: 'ST',
    //         lastName: 'Coleman', 
    //         userDOB: '10041932',
    //         schoolID: '12345'
    //     }

    //     it('should return 404 for a user that doesnt exist', function(done) { //this is how mocha expects HTTP requests to be written: with a done parameter to the function
    //         request(server).get('/guidance/euler@python.com').expect(404, done)
    //     })
    
    //     it('should return 200 for sucessfullly added guidance', function(done) {
    //         request(server).post('/guidance').send(guidance1).expect(200, done)
    //     })

    //     it('should return 200 for getting guidance', function(done) { //this is how mocha expects HTTP requests to be written: with a done parameter to the function
    //         request(server).get('/guidance/euler@python.com').expect(200, done)
    //     })
    

    //     it('should return 200 for sucessfully updated user', function(done){
    //         request(server).put('/guidance').send(guidance2).expect(200, done)
    //     })
        
    //     it('should return 204 for sucessfully deleted user', function(done) {
    //         request(server).delete('/guidance/euler@python.com').expect(204, done)
    //     }) 
    // })


    // describe('/student', function() {

    //     const student1 ={
    //         username: 'euler@python.com',
    //         firstName: 'Scott',
    //         middleName: 'ST',
    //         lastName: 'Clarke', 
    //         userDOB: '10041952',
    //         schoolID: '12345',
    //         previousSchoolIDs: ['12456', '12567']
    //     }

    //     const student2 ={
    //         username: 'euler@python.com',
    //         firstName: 'Russel',
    //         middleName: 'ST',
    //         lastName: 'Coleman', 
    //         userDOB: '10041932',
    //         schoolID: '12678',
    //         previousSchoolIDs: ['12456', '12567', '12345']
    //     }

    //     it('should return 404 for a user that doesnt exist', function(done) { //this is how mocha expects HTTP requests to be written: with a done parameter to the function
    //         request(server).get('/student/euler@python.com').expect(404, done)
    //     })
    
    //     it('should return 200 for sucessfullly added student', function(done) {
    //         request(server).post('/student').send(student1).expect(200, done)
    //     })

    //     it('should return 200 for getting student', function(done) { //this is how mocha expects HTTP requests to be written: with a done parameter to the function
    //         request(server).get('/student/euler@python.com').expect(200, done)
    //     })
    

    //     it('should return 200 for sucessfully updated user', function(done){
    //         request(server).put('/student').send(student2).expect(200, done)
    //     })
        
    //     it('should return 204 for sucessfully deleted user', function(done) {
    //         request(server).delete('/student/euler@python.com').expect(204, done)
    //     }) 
    // })

    describe('/transcript', function(){

        const transcript1 = {
            pdfContent: 'hash value1',
            hashValue: 'hash value1',
            username: 'euler@python.com',
            studentUsername: 'student@emblem.edu', 
            schoolID: '12345',

        }

        const transcript2 = {
            pdfContent: 'hash value2',
            hashValue: 'hash value2',
            username: 'euler@python.com',
            studentUsername: 'student1@emblem.edu', 
            schoolID: '12345',
        }


        it('should return 204 for sucessfully deleted user', function(done) {
            request(server).delete('/transcript/hash value1').expect(204, done)
        }) 

        it('should return 204 for sucessfully deleted user', function(done) {
            request(server).delete('/transcript/hash value2').expect(204, done)
        }) 

        it('should return 404 for a transcript that doesnt exist', function(done) { //this is how mocha expects HTTP requests to be written: with a done parameter to the function
            request(server).get('/transcript/hash value').expect(404, done)
        })
    
        it('should return 200 for sucessfullly added transcript', function(done) {
            request(server).post('/transcript').send(transcript1).expect(200, done)
        })

        it('should return 200 for sucessfullly added transcript', function(done) {
            request(server).post('/transcript').send(transcript2).expect(200, done)
        })

        it('should return 200 for getting transcript', function(done) { //this is how mocha expects HTTP requests to be written: with a done parameter to the function
            request(server).get('/transcript/hash value1').expect(200, done)
        })

        it('should return 200 for getting transcript', function(done) { //this is how mocha expects HTTP requests to be written: with a done parameter to the function
            request(server).get('/transcript/hash value1').expect(200, done)
        })

        // it('should return 200 for getting transcripts', function(done) { //this is how mocha expects HTTP requests to be written: with a done parameter to the function
        //     request(server).get('/transcript/query/username/euler@python.com').expect(200, done)
        // })
    

        // it('should return 200 for sucessfully updated user', function(done){
        //     request(server).put('/transcript').send(transcript2).expect(200, done)
        // })
        
        it('should return 204 for sucessfully deleted user', function(done) {
            request(server).delete('/transcript/hash value').expect(204, done)
        })
    })

    describe('/school', function() {
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
            userDOB: '10041952',
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
        it('should return 204 for sucessfully deleted school', function(done) {
            request(server).delete('/school/12345').expect(204, done)
        })

        //just to make sure all the stuff from previous tests got cleared
        it('should return 204 for sucessfully deleted school', function(done) {
            request(server).delete('/school/22345').expect(204, done)
        })


        it('should return 404 for a school that doesnt exist', function(done) { //this is how mocha expects HTTP requests to be written: with a done parameter to the function
            request(server).get('/school/12345').expect(404, done)
        })
        
        it('should return 200 for sucessfullly added school', function(done) {
            request(server).post('/school').send(school1).expect(200, done)
        })

        it('should return 200 for getting school', function(done) { //this is how mocha expects HTTP requests to be written: with a done parameter to the function
            request(server).get('/school/12345').expect(200, done)
        })

        it('should return 200 for sucessfully updated school', function(done){
            request(server).put('/school/12345').send(school2).expect(200, done)
        })
        
        it('should return 204 for sucessfully deleted school', function(done) {
            request(server).delete('/school/22345').expect(204, done)
        })

        
        
    })

    
})


//vvvv will's code

// describe('GET /helloworld', function() {
//     it('should respond with "hello world"', function(done) {
//         request(server).get('/helloworld').expect('hello world', done)
//     })
// })


// describe('HTTP Server', function() {
//   const creditorPrivateKeyBuffer = bufferUtil.hexToBuffer('540a5e193cebd774a1af02723ba5798d7ff2dec454a56bcd07aa5cf0e6d94ce7')
//   const debtorPrivateKeyBuffer = bufferUtil.hexToBuffer('8e3d087953bf3190e06d827a55b13020f97028885d5307584762779290940bf2')

//   const transaction1 = {
//     creditorAddress: '20347f5b106c870649737930a01841d7ac9ed94c',
//     debtorAddress: 'f2f44df194f812f3ab8eabf9d331f6344edf6ec1',
//     ucacAddress: '20347f5b106c870649737930a01841d7ac9ed94e',
//     amount: 200,
//     memo: 'Giants win by 3',
//     nonce: 0
//   }

//   transaction1.buffer = Buffer.concat([
//     bufferUtil.hexToBuffer(transaction1.ucacAddress),
//     bufferUtil.hexToBuffer(transaction1.creditorAddress),
//     bufferUtil.hexToBuffer(transaction1.debtorAddress),
//     bufferUtil.int32ToBuffer(transaction1.amount),
//     bufferUtil.int32ToBuffer(transaction1.nonce)
//   ])

//   transaction1.hash = ethUtil.sha3(transaction1.buffer)

//   const signature1 = generateSignature(transaction1.hash, creditorPrivateKeyBuffer)

//   const data1 = {
//     transaction: transaction1, 
//     signature: signature1
//   }

//   const transaction2 = {
//     creditorAddress: '20347f5b106c870649737930a01841d7ac9ed94c',
//     debtorAddress: 'f2f44df194f812f3ab8eabf9d331f6344edf6ec1',
//     ucacAddress: '20347f5b106c870649737930a01841d7ac9ed94e',
//     amount: 200,
//     memo: 'Giants win by 3',
//     nonce: 0
//   }

//   transaction2.buffer = Buffer.concat([
//     bufferUtil.hexToBuffer(transaction2.ucacAddress),
//     bufferUtil.hexToBuffer(transaction2.creditorAddress),
//     bufferUtil.hexToBuffer(transaction2.debtorAddress),
//     bufferUtil.int32ToBuffer(transaction2.amount),
//     bufferUtil.int32ToBuffer(transaction2.nonce)
//   ])

//   transaction2.hash = ethUtil.sha3(transaction2.buffer)

//   const signature2 = generateSignature(transaction2.hash, debtorPrivateKeyBuffer)

//   const data2 = {
//     transaction: transaction2, 
//     signature: signature2
//   }

//   describe.only('/transaction', function() {
//     it('GET should return empty array if there are no transactions', function(done) {
//       const address = '20347f5b106c870649737930a01841d7ac9ed94c'
//       request(server).get(`/transaction?addr=${address}`).expect([], done)
//     })

//     it('DELETE should send an error if there is no matching transaction', function(done) {
//       request(server).delete('/transaction').send(data1).expect(503).expect('TRANSACTION_DELETE_ERROR: Error: No Matching Transaction', done)
//     })

//     it('POST should respond with "TRANSACTION_STORED" if there is not a pending match', function(done) {
//       request(server).post('/transaction').send(data1).expect('TRANSACTION_STORED', done)
//     })

//     it('POST should respond with "TRANSACTION_UPDATED" if there is a pending match', function(done) {
//       data1.transaction.amount = 400
//       request(server).post('/transaction').send(data1).expect('TRANSACTION_UPDATED', done)
//     })

//     it('GET should respond with all transactions for the user', function(done) {
//       const address = '20347f5b106c870649737930a01841d7ac9ed94c'
//       request(server).get(`/transaction?addr=${address}`).expect(
//         [{ 
//           transaction: {
//             nonce: 0,
//             memo: 'Giants win by 3',
//             amount: 400,
//             ucacAddress: '20347f5b106c870649737930a01841d7ac9ed94e',
//             debtorAddress: 'f2f44df194f812f3ab8eabf9d331f6344edf6ec1',
//             creditorAddress: '20347f5b106c870649737930a01841d7ac9ed94c'
//           },
//           creditorSignature: '1cb84f182dd64411f40ebc66b27d341cf6bb75bc79edbba5db4c1c093f53b3c63cb39e9c6a536a96b28cb5a87f3b31347542efb2e18f847f3b5075683d7427271c',
//           debtorSignature: null
//         }]
//       , done)
//     })

//     it('POST should respond with "TRANSACTION_WRITTEN" if there is a pending counterpart', function(done) {
//       request(server).post('/transaction').send(data1).end(function() {
//         request(server).post('/transaction').send(data2).expect('TRANSACTION_WRITTEN', done)
//       })
//     })

//     it('DELETE should remove a specific transaction', function(done) {
//       request(server).delete('/transaction').send(data1).expect('TRANSACTION_DELETED', done)
//     })
//   })

//   describe('/nickname', function() {
//     it('GET should send 404 if nickname does not exist', function(done) {
//       const address = '20347f5b106c870649737930a01841d7ac9ed94c'
//       request(server).get(`/nickname?addr=${address}`).expect(404, done)
//     })

//     it('POST should set the nickname for a given user', function(done) {
//       const nickname = 'Billy'
//       const address = '20347f5b106c870649737930a01841d7ac9ed94c'
//       const data = {address, nickname}
//       request(server).post('/nickname').send(data).expect('Billy', done)
//     })

//     it('GET should return nickname if it exists', function(done) {
//       const address = '20347f5b106c870649737930a01841d7ac9ed94c'
//       request(server).get(`/nickname?addr=${address}`).expect(200).expect('Billy', done)
//     })

//     it('should delete entry when done', function() {
//       User.findOne({ address: '20347f5b106c870649737930a01841d7ac9ed94c' }).remove().then( (data) => {
//         assert.equals(data, true)
//       })
//     })

//     // it('DELETE should remove a nickname', function(done) {
//     //   const address = '20347f5b106c870649737930a01841d7ac9ed94c'
//     //   request(server).delete(`/nickname?addr=${address}`).expect(200, done)
//     // })
//   })



//   describe('GET /nonce', function() {
//     it('should respond with the nonce for a given transaction', function(done) {

//     })
//   })
// })

// function generateSignature(hash, privateKeyBuffer) {
//   let { r, s, v } = ethUtil.ecsign(
//     ethUtil.hashPersonalMessage(hash),
//     privateKeyBuffer
//   )

//   return bufferUtil.bufferToHex(
//     Buffer.concat(
//       [ r, s, Buffer.from([ v ]) ]
//     )
//   )
// }