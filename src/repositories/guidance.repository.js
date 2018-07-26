// talks to the database / calls outside of the server
// all Web3.js to call solidity contracts will happen here

const Guidance = require('../entities/Guidance')

const guidanceRepository = {}

guidanceRepository.getGuidance = (username) => {
    //if (id.match(/^[0-9a-fA-F]{24}$/)) {  
    return Guidance.findOne({ username })
    .then( guidance => {
      console.log('GUIDANCE INFO IS: ', guidance)
      return guidance
    })
        
    //}
    //throw new Error('id format is not valid')
}

guidanceRepository.storeGuidance = (guidanceInfo) => {
    console.log('CLIENT INPUT: ', guidanceInfo)
    const newGuidance = new Guidance(guidanceInfo)
    return newGuidance.save()
    .then( guidance => {
        console.log('DATABASE ENTRY:', guidance)
        return guidance
    })
}

guidanceRepository.updateGuidance = (guidanceInfo) => {
    return Guidance.findOne({ username: guidanceInfo.username })
    .then( guidance => {
        console.log('CLIENT INPUT: ', guidanceInfo)
        return guidance.set(guidanceInfo).save()
    }).then( guidance => {
        console.log('HERE ', guidance)
        return guidance
    })
}


guidanceRepository.deleteGuidance = (username) => {
    return Guidance.findOne({ username }).remove()
}

module.exports = guidanceRepository
