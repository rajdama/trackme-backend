const axios = require('axios')

exports.chatBot = async (req, res) => {
  try {
    let content = `Is the statement "${req.body.msg}" related to health or food or excercise or fitness. Answer me only true or false in lowercase`
    response = await axios.post(
      'https://chatgpt53.p.rapidapi.com/',
      {
        messages: [{ role: 'user', content }],
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

    let message = ''
    console.log(response.data.choices[0].message.content == 'false')
    if (response.data.choices[0].message.content == 'false') {
      message =
        'As an AI health assistant, I can help you only with health related topics, you are free to ask me anything and everything related to health and fitness '
      res.status(200).send(message)
    } else {
      message = req.body.msg

      let botResponse = await axios.post(
        'https://chatgpt53.p.rapidapi.com/',
        {
          messages: [{ role: 'user', content: message }],
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
      res.status(200).send(botResponse.data.choices[0].message.content)
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error || 'Something went wrong')
  }
}
