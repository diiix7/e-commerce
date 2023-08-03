const express = require('express')
const {
  signUpAdmin,
  signInAdmin,
  getAdmin,
} = require('../controller/adminController')
const {verifyAdmin} = require('../../middleware/middleware')
const router = express.Router()

router.post('/signupAdmin', signUpAdmin)
router.post('/signinAdmin', signInAdmin)

router.route('/me').get([verifyAdmin], getAdmin)

module.exports = router
