const jwt = require('jsonwebtoken');
const config = require('../config');

const authUtil = {}

//returns a message string
authUtil.verifyToken = req => {
  return new Promise( (resolve, reject) => {
    const token = req.headers['x-access-token'];
    
    if (!token) {
      reject('No token provided.')
    }

    jwt.verify(token, config.secret, function(err, decodedId) {
      if(err) {
        reject('Failed to authenticate token.')
      }
      resolve(decodedId)
    })
  })
}

//returns an object with { auth: true, token: *token* }
authUtil.generateToken = id => {
  const token = jwt.sign({ id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  })

  return { auth: true, token }
}

module.exports = authUtil
