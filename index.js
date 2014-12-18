var Firebase = require("firebase")
var Vue = require("Vue")
var bbface = require("./lib/bbface")
var ref = new Firebase("http://okanokanokano.firebaseio.com")
var loginConsole = new Vue({
  data :{
    statusMessages : ["Initialize"],
  },
  computed : {
    status : {
      get : function() {
        return this.statusMessages[0]
      },
      set : function(msg) {
        this.statusMessages.unshift(msg)
        console.log(this.statusMessages)
      }
    }
  },
  methods:{
    signOut : function(){
      ref.unauth()
    },
    signIn : function(){
      ref.authWithOAuthRedirect("github", function(error) { 
      })
    }
  }
})
loginConsole.$mount("#login-console")

bbface(ref)
ref.onAuth(function(authData){
  if(authData === null){
    loginConsole.status = "Not Login"
    return 
  }
  loginConsole.status = "Login"
  var key = "last_logged_in"
  var time = (new Date()).toString()
  ref.once("value", function(v){
    console.log(v.val().last_logged_in)
  })
  
  ref.child(key).set(time)
})

