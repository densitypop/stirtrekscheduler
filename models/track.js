(function(){
  var Track = function(id, name){
    var track = {}

    track.id = id
    track.name = name

    return track
  }

  if(module && module.exports){
    module.exports = Track
  } else {
    App.Track = Track
  }
})();
