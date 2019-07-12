'use strict';
//imports the dialogflow obj and the simpleresponses from action-on-google
const {
  dialogflow
} = require('actions-on-google');

//imports the functions from firebase
const functions = require('firebase-functions');

//creates a dialogflow app
const app = dialogflow({
  debug: true,
  init: () => ({
    data: {
      exercise: 0,
      round: 0
    },
  }),
});

//imports the intents files
const {welcome} = require('./intents/welcome')
const {start} = require('./intents/start')
const {main} = require('./intents/main')
const {actions_intent_PERMISSION} = require('./intents/actions_intent_PERMISSION')


//define the intents in the app
app.intent('welcome', welcome);
app.intent('start', start);
app.intent('main', main);
app.intent('actions_intent_PERMISSION',actions_intent_PERMISSION);

//export the app to the firebase functions
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
