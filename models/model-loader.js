(function(){

  var ModelLoader = {}
  ModelLoader.allTracks = function(callback){
    var loadTracks = function(data){
      var result = []
      jQuery.each(data, function(idx){
        result.push(App.Track(data[idx].id, data[idx].name))
      })
      callback(result)
    }
    jQuery.getJSON("http://stirtrek.com/Feed/JSON", loadTracks)
  }

  if(module && module.exports){
    module.exports = ModelLoader
  }
})()
