(function(){
  var Speaker = function(id, name, bio){
    var speaker = {}

    speaker.id = id
    speaker.name = name
    speaker.bio = bio

    return speaker
  }

  if(module && module.exports){
    module.exports = Speaker
  } else {
    App.Speaker = Speaker
  }
})()



