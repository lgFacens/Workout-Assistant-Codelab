//Create an object SimpleResponse: the response (text and speech) that needs to be returned to the action
const {
  SimpleResponse,
  Suggestions,
  Permission
} = require('actions-on-google');

//variants of the responses, the @ is replaced with the user name
const responses = [
  `Hello again @! Welcome back! Today you want full body, abs or arms workout?`,
  `Hey @! I missed you! So what do you want to train, full body, abs or arms?`,
  `Welcome back @! For today what workout you want, full body, abs or arms?`
]

//random number used to randomize the responses
const getResponse = (arr) => arr[Math.floor(Math.random() * arr.length)];


//exports the welcome obj with the simpleresponses
exports.welcome = (conv) =>{
  let response = getResponse(responses)
  let name = conv.user.storage.userName
  if(!name){
  conv.ask(new Permission({
    context: 'Hi there, to get to know you better',
    permissions: 'NAME'
  }));
  }else {
    response=response.replace(/@/gi,`${name}`)
    conv.ask(response)
    conv.ask(new Suggestions('Full body','Abs','Arms'))
  }
}
