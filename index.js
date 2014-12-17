var Firebase = require("firebase")
var Vue = require("Vue")
var bbface = require("./lib/bbface")
var ref = new Firebase("http://okanokanokano.firebaseio.com")
  
ref.onAuth(function(authData){
  if(authData === null){
    ref.authWithOAuthPopup("github", function(error) { 
    })
    return 
  }
  console.log("authed")
  var key = "last_logged_in"
  var time = (new Date()).toString()
  ref.once("value", function(v){
    console.log(v.val().last_logged_in)
  })
  
  ref.child(key).set(time)
  bbface(ref)
})

