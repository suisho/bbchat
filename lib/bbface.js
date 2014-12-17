var Vue = require("Vue")

module.exports = function bbface(ref){
  function randomBamboo(){
    return {
      x :Math.random() * 100,
      y :Math.random() * 100,
      h :Math.random() * 100,
      w :Math.random() * 100,
    }
  }
  
  Vue.component("bamboo",{
    //template : "#bamboo",
    data : {
      x : 10, y:10, h : 50, w: 50,
      enableMove : false
    },
    
    methods : {
      onMouseDown : function(e){
        this.$data.enableMove = true
        //      console.log(e)
      },
      onMouseUp : function(e){
        this.$data.enableMove = false
        //console.log(this.$$.palette)
        //      console.log(e)
      },
      
      onMouseMove : function(e){
        if(!this.$data.enableMove){
          return
        }
        this.$data.x = e.x - this.$data.w/2
        this.$data.y = e.y - this.$data.h/2      
      }
    }
  })
  var app = new Vue({
    data : {    
      bamboos : [
      randomBamboo(),
      ]
    },
    created : function(){
    }
  })
  
  app.$mount("#palette")
  setInterval(function(){
    app.bamboos.push(randomBamboo())
  }, 1000)
}