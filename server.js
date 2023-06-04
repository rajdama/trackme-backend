const express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv')
const app = express()
const cors = require('cors')

env.config()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 3000

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.uhh8my9.mongodb.net/`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('database connected')
  })

const userRoutes = require('./routes/user')

app.use('/', userRoutes)

app.listen(port, () => {
  console.log(` Server is running on port ${port} `)
})
