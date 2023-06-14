const nodemailer = require('nodemailer')
const schedule = require('node-schedule')

// fetch all the users and store them in the array
const users = ['temporaryemail2012000@gmail.com']

let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rajdama1729@gmail.com',
    pass: 'nnmvztdxsmqlbnkx',
  },
})
let mailBreakfastDetails = {
  from: 'rajdama1729@gmail.com',
  to: 'temporaryemail2012000@gmail.com',
  subject: 'Time For BreakFast',
  text: 'Hey Pal! I its time you have your breakfast if you have not done yet, if you have already had comeon track it and continue your progress',
}
mailTransporter.sendMail(mailBreakfastDetails, function (err, data) {
  if (err) {
    console.log(err)
  } else {
    console.log('Email sent successfully')
  }
})

schedule.scheduleJob({ hour: 9 }, function () {
  users.forEach((item) => {
    let mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'temporaryemail2012000@gmail.com',
        pass: 'paqigeytqxkvxedg',
      },
    })
    let mailBreakfastDetails = {
      from: 'temporaryemail2012000@gmail.com',
      to: 'temporaryemail2012000@gmail.com',
      subject: 'Time For BreakFast',
      text: 'Hey Pal! I its time you have your breakfast if you have not done yet, if you have already had comeon track it and continue your progress',
    }
    mailTransporter.sendMail(mailBreakfastDetails, function (err, data) {
      if (err) {
        console.log('Error Occurs')
      } else {
        console.log('Email sent successfully')
      }
    })
  })
})
schedule.scheduleJob({ hour: 12 }, function () {
  let mailLunchDetails = {
    from: 'temporaryemail2012000@gmail.com',
    to: 'temporaryemail2012000@gmail.com',
    subject: 'Time For BreakFast',
    text: 'Hey Pal! I its time you have your Lunch if you have not done yet, if you have already had comeon track it and continue your progress',
  }
  mailTransporter.sendMail(mailLunchDetails, function (err, data) {
    if (err) {
      console.log('Error Occurs')
    } else {
      console.log('Email sent successfully')
    }
  })
})

schedule.scheduleJob({ hour: 17 }, function () {
  let mailSnacksDetails = {
    from: 'temporaryemail2012000@gmail.com',
    to: 'temporaryemail2012000@gmail.com',
    subject: 'Time For BreakFast',
    text: 'Hey Pal! I its time you have your Snacks if you have not done yet, if you have already had comeon track it and continue your progress',
  }
  mailTransporter.sendMail(mailSnacksDetails, function (err, data) {
    if (err) {
      console.log('Error Occurs')
    } else {
      console.log('Email sent successfully')
    }
  })
})

schedule.scheduleJob({ hour: 20 }, function () {
  let mailDinnerDetails = {
    from: 'temporaryemail2012000@gmail.com',
    to: 'temporaryemail2012000@gmail.com',
    subject: 'Time For BreakFast',
    text: 'Hey Pal! I its time you have your Dinner if you have not done yet, if you have already had comeon track it and continue your progress',
  }
  mailTransporter.sendMail(mailDinnerDetails, function (err, data) {
    if (err) {
      console.log('Error Occurs')
    } else {
      console.log('Email sent successfully')
    }
  })
})

schedule.scheduleJob({ hour: 16 }, function () {
  let mailWorkoutDetails = {
    from: 'temporaryemail2012000@gmail.com',
    to: 'temporaryemail2012000@gmail.com',
    subject: 'Time For BreakFast',
    text: 'Hey Pal! I its time tor Workout if you have not done done yet, if you have already had comeon track it and continue your progress',
  }
  mailTransporter.sendMail(mailWorkoutDetails, function (err, data) {
    if (err) {
      console.log('Error Occurs')
    } else {
      console.log('Email sent successfully')
    }
  })
})
