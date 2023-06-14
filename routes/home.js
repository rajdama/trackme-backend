const express = require('express')
const {
  getCurrentMonthPlan,
  addUserGoal,
  getUserGoal,
} = require('../controller/home')
const { requireSignin } = require('../middleware/middleware')

const router = express.Router()

router.post('/getCurrentMonthPlan', requireSignin, getCurrentMonthPlan)
router.post('/addUserGoal', requireSignin, addUserGoal)
router.post('/getUserGoal', getUserGoal)

module.exports = router
