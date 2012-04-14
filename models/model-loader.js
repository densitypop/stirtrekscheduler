(function(){

  var ModelLoader = {}
  ModelLoader.allTracks = function(callback){
    var loadTracks = function(data){
      var result = []
      jQuery.each(data.Tracks, function(idx){
        result.push(App.Track(data.Tracks[idx].Id, data.Tracks[idx].Name))
      })
      callback(result)
    }
    jQuery.getJSON("http://stirtrek.com/Feed/JSON", loadTracks)
  }

  if(module && module.exports){
    module.exports = ModelLoader
  } else {
    App.ModelLoader = ModelLoader
  }
})()
