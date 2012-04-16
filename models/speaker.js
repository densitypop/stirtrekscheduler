(function(){
  var Speaker = function(id, name, bio){
    var speaker = {}

    var generateSpeakerPhotoUrl = function(speaker){
      var url = "http://www.stirtrek.com/Content/Images/Speakers/"

      url += (speaker.name == "Brian H. Prince" ? "Brian Prince" : speaker.name)
      if(speaker.name.match(/Weirich$|Sell$/)){
        url += ".jpg"
      } else {
        url += ".png"
      }
      return url
    }

    speaker.id = id
    speaker.name = name
    speaker.bio = bio
    speaker.photoUrl = generateSpeakerPhotoUrl(speaker)

    return speaker
  }

  if(module && module.exports){
    module.exports = Speaker
  } else {
    App.Speaker = Speaker
  }
})()



