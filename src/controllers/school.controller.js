const schoolService = require('../services/school.service')

//just in case we need it later
const userService = require('../services/user.service')

const schoolController = {}

schoolController.getSchool = (req, res) => {
  schoolService.getSchool(req.params.schoolID)
  .then((school) => {
      if (!school) {
          res.status(404).end('School does not exist')
      } else {
          res.status(200).end('got school, yeet!')
      }
  }).then(school => {return school})
  .catch( err => { // 'catch' the error that was thrown by an earlier file (service or repository), and tell the browser the error type and message
      console.log(err)
      if(err === 'id format is not valid') {
          res.status(400).end(err) //send error code and error text (which is defined by `throw new Error`). 400 = invalid request
      } else {
          res.status(503).end(err) //send error code and error text. 503 = service not available
      }
  })
}

schoolController.storeSchool = (req, res) => {
  schoolService.storeSchool(req.body).then( (school) => {
      console.log('WHAT IS HAPPENDING ', school.schoolID)
      res.end('school added')
  })
  .catch( (err) => {
      console.log('ERROR: ', err)
      res.status(400).end(err)
  })
}

schoolController.updateSchool = (req, res) => {
  schoolService.updateSchool(req.body).then( (school)  => {
      res.end(school.schoolID)
  })
  .then((school) => {
      if (!school){
          res.status(404).end('User does not exist')
      }else{
          res.status(200).end('User sucessfully updated')
      }
  })
  .catch ((err) => {
      console.log('ERROR: ', err)
      res.status(400).end(err)
  })
}

schoolController.deleteSchool = (req, res) => {
  schoolService.deleteSchool(req.params.schoolID).then((data) => {
          res.status(204).end()
      })
      .catch((err) => {
          console.log(err)
          res.status(400).end('DELETE_FAILED')
      })
}


module.exports = schoolController