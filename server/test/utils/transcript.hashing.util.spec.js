const ethUtil = require('ethereumjs-util')
const creditProtocolUtil = require('../src/utils/credit.protocol.util')
const bufferUtil = require('../src/utils/buffer.util')

describe('Credit Protocol Util', function() {
  describe('#verifySignature', function() {
    it('should see if signature matches one of the addresses in a transaction', function() {
      const transaction = {
        creditorAddress: '20347f5b106c870649737930a01841d7ac9ed94c',
        debtorAddress: '20347f5b106c870649737930a01841d7ac9ed94d',
        ucacAddress: '20347f5b106c870649737930a01841d7ac9ed94e',
        amount: 200,
        memo: 'Giants win by 3',
        nonce: 0
      }

      transaction.buffer = Buffer.concat([
        bufferUtil.hexToBuffer(transaction.ucacAddress),
        bufferUtil.hexToBuffer(transaction.creditorAddress),
        bufferUtil.hexToBuffer(transaction.debtorAddress),
        bufferUtil.int32ToBuffer(transaction.amount),
        bufferUtil.int32ToBuffer(transaction.nonce)
      ])
      
      transaction.hash = ethUtil.sha3(transaction.buffer)
  
      const privateKeyBuffer = bufferUtil.hexToBuffer('540a5e193cebd774a1af02723ba5798d7ff2dec454a56bcd07aa5cf0e6d94ce7')
  
      //generate signature
      const { r, s, v } = ethUtil.ecsign(
        ethUtil.hashPersonalMessage(transaction.hash),
        privateKeyBuffer
      )
  
      const signature = bufferUtil.bufferToHex(
        Buffer.concat(
          [ r, s, Buffer.from([ v ]) ]
        )
      )
      //GET to `localhost/nonce/${address1}/${address2}`
  
      let result = creditProtocolUtil.verifySignature(signature, transaction)
      assert.equal(result, true)
    })
  })
})
