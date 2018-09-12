const Web3 = require('web3')

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

const blockchainRepository = {}

blockchainRepository.storeTranscriptInfo = (hash, signature) => {
  // generate & sign transaction to store on contract

  // send transaction
}

blockchainRepository.retrieveTranscriptInfo = hash => {
  // generate transaction to query contract

  // query contract
}

module.exports = blockchainRepository
