(function(){
  var Session = function(id, name, abstract, speakerIds, timeSlotId, trackId, tags, modelLoader){
    var session = {},
        modelLoader = modelLoader || App.ModelLoader

    session.id = id
    session.name = name
    session.abstract = abstract
    session.speakerIds = speakerIds
    session.timeSlotId = timeSlotId
    session.trackId = trackId
    session.tags = tags

    session.isFavorite = function(){
      var favorite = modelLoader.favoriteBySessionId(session.id)
      return (favorite !== undefined && favorite !== null)
    }
    session.timeSlot = function(){
      return modelLoader.timeSlotById(session.timeSlotId)
    }
    session.speakers = function(){
      return modelLoader.allSpeakersById(session.speakerIds)
    }
    session.track = function(){
      return modelLoader.trackById(session.trackId)
    }
    session.similarSessions = function(){
      return modelLoader.sessionsByTagNames(session.tags)
    }

    return session
  }

  if(module && module.exports){
    module.exports = Session
  } else {
    App.Session = Session
  }
})();
