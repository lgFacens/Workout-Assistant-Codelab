const {
  SimpleResponse,
  Permission
} = require('actions-on-google')

exports.actions_intent_PERMISSION = (conv,params,permissionGranted) => {
  if(!permissionGranted){
    conv.ask(`Ok, no problem. So let's start, you want a full body, abs or arms worout? `)
  } else{
    conv.user.storage.userName = conv.user.name.display
    conv.ask(`Thanks ${conv.user.storage.userName} is own pleasure to have you here. So let's start, you want a full body, abs or arms worout?`)
  }
}
