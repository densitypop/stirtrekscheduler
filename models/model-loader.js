(function(){

  var ModelLoader = {}
  ModelLoader.init = function(){
    var loadData = function(data){
      ModelLoader.cachedData = _(data)
    }
    jQuery.getJSON("http://stirtrek.com/Feed/JSON", loadData)
  }
  ModelLoader.allTracks = function(callback){
    return ModelLoader.cachedData._wrapped.Tracks.map(function(track){
      return App.Track(track.Id, track.Name)
    });
  }
  ModelLoader.sessionsByTrackId = function(trackId){
    var rawSessions = _(ModelLoader.cachedData._wrapped.Sessions).select(function(session){
      return session.TrackId == trackId
    })
    return rawSessions.map(function(session){
      return App.Session(session.Id, session.Name, session.Abstract, session.SpeakerIds, session.TimeSlotId, session.TrackId)
    })
  }

  if(module && module.exports){
    module.exports = ModelLoader
  } else {
    App.ModelLoader = ModelLoader
  }
})()
