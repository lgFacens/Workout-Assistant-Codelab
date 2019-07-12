//stores the workout types and its information
const workouts={
  fullbody:{
    rounds:4,
    rest:1,
    exercises: [
      {name:"push ups",reps:8,time:2},
      {name:"squads",reps:12,time:3},
      {name:"bench dips",reps:6,time:1.7},
      {name:"leg raises",reps:10,time:3.2},
      {name:"abdominal crunch",reps:20,time:2.5}
    ]
  },
  abs:{
    rounds:4,
    rest:1,
    exercises: [
      {name:"abdominal crunch",reps:20,time:1.5},
      {name:"leg raises",reps:10,time:3.2},
      {name:"bicycle crunches",reps:12,time:1.5},
      {name:"tuck and crunch",reps:12,time:1.5}
    ]
  },
  arms:{
    rounds:4,
    rest:1,
    exercises: [
      {name:"push ups",reps:5,time:2},
      {name:"bench dips",reps:6,time:1.7},
      {name:"pull ups",reps:5,time:3},
      {name:"diamond push ups",reps:5,time:2}
    ]
  }
}

//exports the workouts so it can be reachable to other files
  module.exports = {workouts}
