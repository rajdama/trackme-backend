const express = require('express')
const { getCurrentMonthPlan } = require('../controller/home')
const { requireSignin } = require('../middleware/middleware')

const router = express.Router()

router.post('/getCurrentMonthPlan', getCurrentMonthPlan)

module.exports = router
