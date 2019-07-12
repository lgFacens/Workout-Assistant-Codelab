//Create an object SimpleResponse: the response (text and speech) that needs to be returned to the action
const {
  SimpleResponse
} = require('actions-on-google');

//the content of the workouts
const {workouts} = require('./src/workouts')

//generate string method:
function strGen(conv,str,workout){
  let id = conv.data.exercise
  let reps = workouts[workout].exercises[id].reps
  let breaktime = workouts[workout].exercises[id].time + conv.data.velocity
  for(let i=1;i<=reps;i++)
    str+=i + ` <break time="${breaktime}"/> `
  str+=`<break time="2s"/>. `
  return str
}

//speak method: get the selected workout and its information (id,repetitions,name) and returns the exercise routine
function speak(conv,str1){
  let workout = conv.user.storage.workout
  let rest = workouts[workout].rest
  let id = conv.data.exercise
  let reps = workouts[workout].exercises[id].reps
  let name = workouts[workout].exercises[id].name
  let str2 = `<speak>`
  str1+=` The <say-as interpret-as="ordinal">${id+1}</say-as> is ${name}, do ${reps} repetitions. Starting... <break time="2s"/></speak>\n`
  conv.ask(str1);
  str2=strGen(conv,str2,workout)
  if(conv.data.exercise<workouts[workout].exercises.length-1){
    conv.data.exercise++
    str2+=`Can we move to the next exercise? </speak>`
    conv.ask(new SimpleResponse({
      text: `Can we move to the next exercise?`,
      speech: str2
    }))
  } else{
    conv.data.exercise=0
    conv.data.round++
    if(conv.data.round<workouts[workout].rounds){
      str2+=`First round over, take a rest of ${rest} minutes. <break time='60s'/> Can we continue? </speak>`
      conv.ask(new SimpleResponse({
        text: `First round over, take a rest of ${rest} minutes. Can we continue? </speak>`,
        speech: str2
      }))
    } else{
      conv.data.round=0
      conv.close(`Congrats! You finished the ${workout} workout! See you!`)
    }
  }
  return conv
}

//go back to the start of the exercise
function exerciseBack(conv){
  let workout = conv.user.storage.workout
  if(conv.data.exercise>0){
    conv.data.exercise--
  } else{
    conv.data.round--
    conv.data.exercise=workouts[workout].exercises.length-1
  }
}

//ask for a break
function breakCommand(conv,str1){
  exerciseBack(conv)
  str1+=`Take a break of 15 seconds.<break time="15s"/>\n`
  return str1
}

//go back to the previous exercise
function backCommand(conv,str1){
  let workout = conv.user.storage.workout
  if(conv.data.exercise<2){
    if(conv.data.round<1)
      exerciseBack(conv)
    else{
      if(conv.exercise==1){
        conv.data.exercise=workouts[workout].exercises.length-1
        conv.data.round--
      } else{
        conv.data.exercise=workouts[workout].exercises.length-1
        conv.data.round--
      }
    }
  } else
      conv.data.exercise-=2
  str1+=`Going back to previus exercise... <break time="0.5s"/>\n`
  return str1
}

//replay the exercise
function replayCommand(conv,str1){
  exerciseBack(conv)
  str1+=`Restarting the exercise... <break time="0.5s"/>\n`
  return str1
}

//exports the main file and manage which method is going to be called when each word is spoke
exports.main = (conv) =>{
  let command = conv.body.queryResult.parameters.commands
  let str1 = '<speak>'
  switch (command) {
    case "stop":
      str1 = stopCommand(conv,str1)
      break;

    case "slower":
      str1 = slowerCommand(conv,str1)
      break;

    case "faster":
      str1 = fasterCommand(conv,str1)
      break;

    case "break":
      str1 = breakCommand(conv,str1)
      break;

    case "back":
      str1 = backCommand(conv,str1)
      break;

    case "replay":
      str1 = replayCommand(conv,str1)
      break;
  }
  speak(conv,str1)
}
