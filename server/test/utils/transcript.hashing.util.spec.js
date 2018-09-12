const assert = require('assert')

const transcriptHashingUtil = require('../../utils/transcript.hashing.util')

describe('Transcript Hashing Util', function() {
  const privateKey = '540a5e193cebd774a1af02723ba5798d7ff2dec454a56bcd07aa5cf0e6d94ce7'
  const signingAddress = '20347f5b106c870649737930a01841d7ac9ed94c'
  const wrongAddress = '20347f5b106c870649737930a01841d7ac9ed94d'
  const mockTranscript = 'GPA 3.5 Graduation Year 2017 Name Loquanda McKenzie'
  const mockHashHex = 'ee706dfe1d31619007187afbc81fbf962280258a1542582f9a05628a9da370d4'
  const wrongMockHashHex = 'fe706dfe1d31619007187afbc81fbf962280258a1542582f9a05628a9da370d4'
  const mockSignature = '7c1bfe96b0ee42f92d7d33828f503be8fb54d96a388ae929b2498e0d5930a44e75b322ab15089f714806776516e7597bc3a226b67bb39b608af8f1100f10f4b91c'
  const wrongMockSignature = '8c1bfe96b0ee42f92d7d33828f503be8fb54d96a388ae929b2498e0d5930a44e75b322ab15089f714806776516e7597bc3a226b67bb39b608af8f1100f10f4b91c'

  describe('#hashTranscript', function() {
    it('should hash a normal string into a buffer then a hex string of length 64', function() {
      assert.equal(transcriptHashingUtil.hashTranscript(mockTranscript), mockHashHex)
      assert.equal(transcriptHashingUtil.hashTranscript(mockTranscript).length, 64)
    })
  })

  describe('#signTranscriptHash', function() {
    it('should return a hexidecimal signature given a hexidecimal hash and hexidecimal private key', function() {
      assert.equal(transcriptHashingUtil.signTranscriptHash(mockHashHex, privateKey), mockSignature)
    })
  })

  describe('#verifySignature', function() {
    it('should return false if there is no match', function() {
      assert.equal(transcriptHashingUtil.verifySignature(mockHashHex, mockSignature, wrongAddress), false)
    })

    it('should return true if there is a match', function() {
      assert.equal(transcriptHashingUtil.verifySignature(mockHashHex, mockSignature, signingAddress), true)
    })
  })

  describe('#signatureToAddress', function() {
    it('should return the correct address given a transcriptHashHex and signature', function() {
      assert.equal(transcriptHashingUtil.signatureToAddress(mockHashHex, mockSignature), signingAddress)
    })

    it('should return an incorrect address given the wrong hash or signature', function() {
      assert.notEqual(transcriptHashingUtil.signatureToAddress(wrongMockHashHex, mockSignature), signingAddress)
      assert.notEqual(transcriptHashingUtil.signatureToAddress(mockHashHex, wrongMockSignature), signingAddress)
    })
  })
})
