const { Client, Users, ID, Databases } = require('node-appwrite')

const client = new Client()
  .setEndpoint(`${process.env.APPWRITE_ENDPOINT}`) // Your API Endpoint
  .setProject(`${process.env.APPWRITE_PROJECT_ID}`) // Your project ID
  .setKey(`${process.env.APPWRITE_API_KEY}`)

const databases = new Databases(client)

const fetchDocumentById = async (userId) => {
  const allDocuments = await databases.listDocuments(
    '648040b07ab2b69101c8',
    '6485a1d987f8cacdbd5e'
  )
  // console.log(allDocuments)
  const userDocument = await allDocuments.documents.filter(
    (document) => document.userId == userId
  )
  return userDocument
}

exports.excercisePlanExist = async (req, res) => {
  const userDocument = await fetchDocumentById(req.body.userId)

  if (userDocument?.length != 0) {
    res.status(200).send(true)
  } else {
    res.status(200).send(false)
  }
}

exports.createExcercisePlan = async (req, res) => {
  console.log('inside create')
  const excercisePlan = [req.body.excercise]

  const stringifidExcercisePlan = JSON.stringify(excercisePlan)

  const document = await databases.createDocument(
    '648040b07ab2b69101c8',
    '6485a1d987f8cacdbd5e',
    ID.unique(),
    {
      userId: `${req.body.userId}`,
      excercisePlan: stringifidExcercisePlan,
    }
  )
  console.log(excercisePlan)
  res.status(200).send(excercisePlan)
}

exports.updateExcercisePlan = async (req, res) => {
  const excercisePlan = await fetchDocumentById(req.body.userId)
  const stringifiedExcercisePlan = excercisePlan[0].excercisePlan
  const parsedExcercisePlan = JSON.parse(stringifiedExcercisePlan)
  parsedExcercisePlan.push(req.body.excercise)

  const document = await databases.updateDocument(
    '648040b07ab2b69101c8',
    '6485a1d987f8cacdbd5e',
    `${excercisePlan[0].$id}`,
    {
      userId: `${req.body.userId}`,
      excercisePlan: JSON.stringify(parsedExcercisePlan),
    }
  )

  res.status(200).send(parsedExcercisePlan)
}

exports.getExcercisePlan = async (req, res) => {
  let userExcercisePlan = await fetchDocumentById(req.body.userId)

  if (userExcercisePlan.length != 0) {
    const parsedExcercisePlan = JSON.parse(userExcercisePlan[0].excercisePlan)
    res.status(200).send(parsedExcercisePlan)
  } else {
    res.status(200).send([])
  }
}
