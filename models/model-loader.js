(function(){

  var ModelLoader = {}
  ModelLoader.init = function(callback){
    var loadData = function(data){
      ModelLoader.cachedData = {}
      _.tap(ModelLoader.cachedData, function(cached){
        cached.Sessions = _(data.Sessions)
        cached.Tracks = _(data.Tracks)
        cached.TimeSlots = _(data.TimeSlots)
        cached.Speakers = _(data.Speakers)
      })
      callback()
    }
    jQuery.getJSON("http://stirtrek.com/Feed/JSON", loadData)
  }
  ModelLoader.allTracks = function(callback){
    return ModelLoader.cachedData.Tracks.map(function(track){
      return App.Track(track.Id, track.Name)
    });
  }
  ModelLoader.sessionsByTrackId = function(trackId){
    var sessions = ModelLoader.allSessions().select(function(session){
      return session.trackId == trackId
    })
    return sessions
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
  ModelLoader._allSessions = function(){
    var sessions = ModelLoader.cachedData.Sessions.map(function(session){
      return App.Session(session.Id, session.Name, session.Abstract, session.SpeakerIds, session.TimeSlotId, session.TrackId, session.Tags)
    })
    return _(sessions)
  }
  ModelLoader.allSessions = function(){
    return _(ModelLoader._allSessions().sortBy(function(session){
      return session.timeSlot().sortVal()
    }))
  }
  ModelLoader.sessionsByTimeSlotId = function(timeSlotId){
    return ModelLoader.allSessions().select(function(session){
      return session.timeSlotId == timeSlotId
    })
  }
  ModelLoader.sessionById = function(id){
    var session = ModelLoader.allSessions().select(function(session){
      return session.id == id
    })[0]
    return session
  }
  ModelLoader.trackById = function(id){
    var track = ModelLoader.cachedData.Tracks.select(function(track){
      return track.Id == id
    })[0]
    return App.Track(track.Id, track.Name)
  }
  ModelLoader.favoriteSessions = function(){
    var favorites = JSON.parse(localStorage.getItem("stirtrek-favorites")),
        sessions = ModelLoader.allSessions().select(function(session){
          if(_.include(favorites, JSON.stringify(session.id))){
            return session
          }
        })
    if(sessions.length === 0) return []
    return sessions
  }
  ModelLoader.favoriteBySessionId = function(id){
    return _.select(ModelLoader.favoriteSessions(), function(session){
      return session.id == id
    })[0]
  }
  ModelLoader.sessionsByTagNames = function(tagNames){
    return ModelLoader.allSessions().select(function(session){
      return _.intersection(session.tags, tagNames).length > 0
    })
  }

  if(module && module.exports){
    module.exports = ModelLoader
  } else {
    App.ModelLoader = ModelLoader
  }
})();
