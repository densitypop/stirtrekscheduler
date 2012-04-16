(function(){

  var ModelLoader = {}
  ModelLoader.init = function(){
    var loadData = function(data){
      ModelLoader.cachedData = {}
      _.tap(ModelLoader.cachedData, function(cached){
        cached.Sessions = _(data.Sessions)
        cached.Tracks = _(data.Tracks)
        cached.TimeSlots = _(data.TimeSlots)
        cached.Speakers = _(data.Speakers)
      })
    }
    jQuery.getJSON("http://stirtrek.com/Feed/JSON", loadData)
  }
  ModelLoader.allTracks = function(callback){
    return ModelLoader.cachedData.Tracks.map(function(track){
      return App.Track(track.Id, track.Name)
    });
  }
  ModelLoader.sessionsByTrackId = function(trackId){
    var rawSessions = ModelLoader.cachedData.Sessions.select(function(session){
      return session.TrackId == trackId
    })
    return rawSessions.map(function(session){
      return App.Session(session.Id, session.Name, session.Abstract, session.SpeakerIds, session.TimeSlotId, session.TrackId)
    })
  }
  ModelLoader.timeSlotById = function(id){
    var raw = ModelLoader.cachedData.TimeSlots.select(function(timeSlot){
      return timeSlot.Id == id
    })[0]
    return App.TimeSlot(raw.Id, raw.StartTime, raw.EndTime)
  }
  ModelLoader.allSpeakersById = function(ids){
    var raw = ModelLoader.cachedData.Speakers.select(function(speaker){
      return _(ids).include(speaker.Id)
    })
    return raw.map(function(speaker){
      return App.Speaker(speaker.Id, speaker.Name, speaker.Bio)
    })
  }
  ModelLoader.allTimeSlots = function(){
    var timeSlots = ModelLoader.cachedData.TimeSlots.map(function(timeSlot){
      return App.TimeSlot(timeSlot.Id, timeSlot.StartTime, timeSlot.EndTime)
    })
    return _(timeSlots).sortBy(function(timeSlot){
      return timeSlot.sortVal()
    })
  }

  if(module && module.exports){
    module.exports = ModelLoader
  } else {
    App.ModelLoader = ModelLoader
  }
})()
