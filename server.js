const express = require('express')
const env = require('dotenv')
const app = express()
const cors = require('cors')

env.config()
app.use(
  cors({
    origin: 'https://track-me-frontend.netlify.app',
  })
)
app.use(express.json())
const port = process.env.PORT || 3000

const userRoutes = require('./routes/user')
const mealPlanRoutes = require('./routes/mealPlan')
const excercisePlanRoutes = require('./routes/excercise')
const homePlanRoutes = require('./routes/home')
const chatBot = require('./routes/chatBot')
const { sendEmails } = require('./emails')

sendEmails()
  .then(() => {
    console.log('success')
  })
  .catch(() => {
    console.log('fail')
  })
app.use('/', userRoutes)
app.use('/', mealPlanRoutes)
app.use('/', excercisePlanRoutes)
app.use('/', homePlanRoutes)
app.use('/', chatBot)

app.listen(port, () => {
  console.log(` Server is running on port ${port} `)
})
