const { Client, Account, ID } = require('appwrite')

const client = new Client()
  .setEndpoint(`${process.env.APPWRITE_ENDPOINT}`) // Your API Endpoint
  .setProject(`${process.env.APPWRITE_PROJECT_ID}`) // Your project ID

const account = new Account(client)

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

exports.signin = (req, res) => {
  const user = account.createEmailSession(
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
