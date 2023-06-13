const express = require('express')
const { signup, signin } = require('../controller/user')
const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} = require('../validator/validator.js')
const router = express.Router()

router.post('/signin', validateSigninRequest, signin)
router.post('/signup', validateSignupRequest, signup)

module.exports = router
