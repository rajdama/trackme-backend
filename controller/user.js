const jwt = require('jsonwebtoken')
const { Client, Users } = require('node-appwrite')

const client = new Client()
  .setEndpoint(`${process.env.APPWRITE_ENDPOINT}`) // Your API Endpoint
  .setProject(`${process.env.APPWRITE_PROJECT_ID}`) // Your project ID
  .setKey(`${process.env.APPWRITE_API_KEY}`)

const users = new Users(client)

exports.signup = (req, res) => {
  const user = account.create(
    ID.unique(),
    `${req.body.email}`,
    `${req.body.password}`
  )

  user.then(
    function (response) {
      res.status(200).send(response)
    },
    function (error) {
      res.status(400).send(error)
    }
  )
}

exports.signin = async (req, res) => {
  const userList = await users.list()
  const usersDetails = userList.users
  let error = true

  for (let i = 0; i < usersDetails.length; i++) {
    if (usersDetails[i].email == req.body.email) {
      const token = jwt.sign(
        { email: usersDetails[i].email, password: usersDetails[i].password },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '2h' }
      )
      error = false
      res.status(200).send({ token: token, user: usersDetails[i] })
    }
  }

  if (error) {
    res.status(400).send('Error !!')
  }
}
