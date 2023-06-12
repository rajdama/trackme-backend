const express = require('express')
const env = require('dotenv')
const app = express()
const cors = require('cors')

env.config()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 3000

const userRoutes = require('./routes/user')
const mealPlanRoutes = require('./routes/mealPlan')
const excercisePlanRoutes = require('./routes/excercise')

app.use('/', userRoutes)
app.use('/', mealPlanRoutes)
app.use('/', excercisePlanRoutes)

app.listen(port, () => {
  console.log(` Server is running on port ${port} `)
})
