(function(){

  var ModelLoader = {}
  ModelLoader.init = function(){
    var loadData = function(data){
      ModelLoader.cachedData = _(data)
    }
    jQuery.getJSON("http://stirtrek.com/Feed/JSON", loadData)
  }
  ModelLoader.allTracks = function(callback){
    return ModelLoader.cachedData.Tracks.map(function(track){
      return App.Track(track.Id, track.Name)
    });
  }

  if(module && module.exports){
    module.exports = ModelLoader
  } else {
    App.ModelLoader = ModelLoader
  }
})()
