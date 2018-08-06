const ethUtil = require('ethereumjs-util')
const fs = require('fs')

const privateKey = Buffer.from('540a5e193cebd774a1af02723ba5798d7ff2dec454a56bcd07aa5cf0e6d94ce7', 'hex')

const address = ethUtil.privateToAddress(privateKey).toString('hex')

console.log(address)
