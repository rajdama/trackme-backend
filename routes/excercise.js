const express = require('express')
const {
  createExcercisePlan,
  getExcercisePlan,
  excercisePlanExist,
  updateExcercisePlan,
} = require('../controller/excercise')

const router = express.Router()

router.post('/createExcercisePlan', createExcercisePlan)
router.post('/getExcercisePlan', getExcercisePlan)
router.post('/excercisePlanExist', excercisePlanExist)
router.post('/updateExcercisePlan', updateExcercisePlan)

module.exports = router
