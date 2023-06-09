const jwt = require('jsonwebtoken')
const { Client, Users, ID, Databases } = require('node-appwrite')

const client = new Client()
  .setEndpoint(`${process.env.APPWRITE_ENDPOINT}`) // Your API Endpoint
  .setProject(`${process.env.APPWRITE_PROJECT_ID}`) // Your project ID
  .setKey(`${process.env.APPWRITE_API_KEY}`)

const databases = new Databases(client)

const fetchDocumentById = async (userId) => {
  const allDocuments = await databases.listDocuments(
    '648040b07ab2b69101c8',
    '648040b07ab2b69101c99'
  )
  const userDocument = await allDocuments.documents.filter(
    (document) => document.userId == userId
  )
  return userDocument
}
exports.mealPLanExists = async (req, res) => {
  const userDocument = await fetchDocumentById(req.body.userId)
  let mealPlanExist = false
  if (userDocument?.length != 0) {
    let userMealPlan = JSON.parse(userDocument[0].mealPlan)
    userMealPlan?.map((mealPlan) => {
      if (mealPlan?.length != 0) {
        mealPlanExist = true
      }
    })
    if (mealPlanExist) {
      res.status(200).send(true)
    } else {
      res.status(200).send(false)
    }
  } else {
    res.status(200).send(false)
  }
}

exports.updateMealPlan = async (req, res) => {
  const userDocument = await fetchDocumentById(req.body.userId)
  let userMealPlan = JSON.parse(userDocument[0].mealPlan)
  userMealPlan[req.body.period].push(req.body.food)
  userMealPlan = JSON.stringify(userMealPlan)
  const document = await databases.updateDocument(
    '648040b07ab2b69101c8',
    '648040b07ab2b69101c99',
    `${userDocument[0].$id}`,
    { mealPlan: userMealPlan }
  )
}

exports.createMealPlan = async (req, res) => {
  console.log('inside create')
  const period = req.body.period
  const mealPlan = [[], [], [], []]
  mealPlan[period].push(req.body.food)

  const stringifiedMealPlan = JSON.stringify(mealPlan)

  const document = databases.createDocument(
    '648040b07ab2b69101c8',
    '648040b07ab2b69101c99',
    ID.unique(),
    {
      userId: `${req.body.userId}`,
      mealPlan: stringifiedMealPlan,
    }
  )
}

exports.getMealPlan = async (req, res) => {
  let userDocument = await fetchDocumentById(req.body.userId)
  console.log(userDocument)
  if (userDocument.length != 0) {
    const mealPlan = JSON.parse(userDocument[0].mealPlan)
    res.status(200).send(mealPlan)
  } else {
    res.status(200).send([])
  }
}
