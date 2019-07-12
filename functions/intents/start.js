//Create an object SimpleResponse: the response (text and speech) that needs to be returned to the action
const {
  SimpleResponse
} = require('actions-on-google');

//responses variants
const startWorkResp = [
  new SimpleResponse({
    text:'So can we start the exercises?',
    speech:'So can we start the exercises?'
  }),
  new SimpleResponse({
    text:'Are you ready to start?',
    speech:'Are you ready to start?'
  }),
  new SimpleResponse({
    text:'Ready to start working out?',
    speech:'Ready to start working out?'
  })
]

//random number used to randomize the responses
const getResponse = (arr) => arr[Math.floor(Math.random() * arr.length)];


//export the start obj with the following atributtes: selected workout,selected difficulty and simpleresponse
exports.start = (conv) =>{
  let workout = conv.body.queryResult.parameters.workouts
  let response = getResponse(startWorkResp)
  conv.user.storage.workout = workout
  conv.user.storage.difficulty = 'beginner'
  conv.ask(response)
}
