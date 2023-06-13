const express = require('express')
const {
  createMealPlan,
  mealPLanExists,
  updateMealPlan,
  getMealPlan,
} = require('../controller/mealPlan')
const { requireSignin } = require('../middleware/middleware')

const router = express.Router()

router.post('/createMealPlan', createMealPlan)
router.post('/updateMealPlan', updateMealPlan)
router.post('/mealPlanExists', mealPLanExists)
router.post('/getMealPlan', requireSignin, getMealPlan)

module.exports = router
