const ethUtil = require('ethereumjs-util')

const transcriptHashingUtil = {}

transcriptHashingUtil.hashTranscript = (transcript) => {
    const hash = Buffer.from(transcript)
    return ethUtil.hashPersonalMessage(hash).toString('hex')
}

transcriptHashingUtil.signTranscriptHash = (transcriptHashHex, privateKey) => {
    if(privateKey.slice(0, 2) === '0x') {
        privateKey = privateKey.slice(2)
    }

    const msgHash = Buffer.from(transcriptHashHex, 'hex')
    const privateKeyBuffer = Buffer.from(privateKey, 'hex')
    return ethUtil.ecsign(msgHash, privateKeyBuffer)
}

transcriptHashingUtil.verifySignature = (transcriptHashHex, signature, address) => {
    if(addresss.slice(0, 2) === '0x') {
        addresss = addresss.slice(2)
    }

    const sigAddress = transcriptHashingUtil.signatureToAddress(transcriptHashHex, signature)
    return sigAddress === address
}

transcriptHashingUtil.signatureToAddress = (transcriptHashHex, signature) => {
    const { v, r, s } = transcriptHashingUtil.decomposeSignature(signature)
    const msgHash = Buffer.from(transcriptHashHex, 'hex')
    const addressBuffer = ethUtil.pubToAddress( ethUtil.ecrecover(msgHash, v, r, s) )
    return hexAddress = addressBuffer.toString('hex')
}

transcriptHashingUtil.decomposeSignature = (signature) => {
    //strip leading '0x', r is first 64 bytes, s is next 64 bytes, v is last 2 bytes
    const signatureBuffer = hexToBuffer(signature)
    const r = signatureBuffer.slice(0, 32)
    const s = signatureBuffer.slice(32, 64)
    const v = signatureBuffer.readUIntBE(64, 1)
    return { v, r, s }
}

function hexToBuffer(value) {
    if (value.substr(0, 2) === '0x') {
        value = value.substr(2)
    }
  
    return Buffer.from(value, 'hex')
} 

module.exports = transcriptHashingUtil


// exports.ecrecover = function (msgHash, v, r, s) {
//     var signature = Buffer.concat([exports.setLength(r, 32), exports.setLength(s, 32)], 64)
//     var recovery = v - 27
//     if (recovery !== 0 && recovery !== 1) {
//       throw new Error('Invalid signature v value')
//     }
//     var senderPubKey = secp256k1.recover(msgHash, signature, recovery)
//     return secp256k1.publicKeyConvert(senderPubKey, false).slice(1)
//   }