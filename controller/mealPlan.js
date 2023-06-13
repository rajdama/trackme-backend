const { Client, Users, ID, Databases } = require('node-appwrite')

const client = new Client()
  .setEndpoint(`${process.env.APPWRITE_ENDPOINT}`) // Your API Endpoint
  .setProject(`${process.env.APPWRITE_PROJECT_ID}`) // Your project ID
  .setKey(`${process.env.APPWRITE_API_KEY}`)

const databases = new Databases(client)

const fetchDocumentByIdAndDate = async (userId, date) => {
  const allDocuments = await databases.listDocuments(
    '648889c9d70e67f298c6',
    '648889d9a5d7e0ba9e8a'
  )

  const userDocument = allDocuments.documents.filter(
    (document) => document.userId == userId && document.date == date
  )

  return userDocument
}

exports.mealPLanExists = async (req, res) => {
  const userDocument = await fetchDocumentByIdAndDate(
    req.body.userId,
    req.body.date
  )
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
  const userDocument = await fetchDocumentByIdAndDate(
    req.body.userId,
    req.body.date
  )
  let userMealPlan = JSON.parse(userDocument[0].mealPlan)
  userMealPlan[req.body.period].push(req.body.food)
  userMealPlan = JSON.stringify(userMealPlan)
  const document = await databases.updateDocument(
    '648889c9d70e67f298c6',
    '648889d9a5d7e0ba9e8a',
    `${userDocument[0].$id}`,
    { mealPlan: userMealPlan }
  )
  res.status(200).send(document)
}

exports.createMealPlan = async (req, res) => {
  const period = req.body.period
  const mealPlan = [[], [], [], []]
  mealPlan[period].push(req.body.food)

  const stringifiedMealPlan = JSON.stringify(mealPlan)

  const document = await databases.createDocument(
    '648889c9d70e67f298c6',
    '648889d9a5d7e0ba9e8a',
    ID.unique(),
    {
      userId: `${req.body.userId}`,
      mealPlan: stringifiedMealPlan,
      date: `8-5-2023`,
    }
  )
}

exports.getMealPlan = async (req, res) => {
  let userDocument = await fetchDocumentByIdAndDate(
    req.body.userId,
    req.body.date
  )

  if (userDocument.length != 0) {
    const mealPlan = JSON.parse(userDocument[0].mealPlan)
    res.status(200).send(mealPlan)
  } else {
    res.status(200).send([])
  }
}
