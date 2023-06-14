const axios = require('axios')

exports.chatBot = async (req, res) => {
  try {
    response = await axios.post(
      'https://chatgpt53.p.rapidapi.com/',
      {
        messages: [{ role: 'user', content: `${req.body.msg}` }],
        temperature: 1,
      },
      {
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
          'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com',
        },
      }
    )
    res.status(200).send(response.data.choices)
  } catch (error) {
    res.status(500).send(error || 'Something went wrong')
  }
}
