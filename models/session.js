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

    session.timeSlot = function(){
      return modelLoader.timeSlotById(session.timeSlotId)
    }
    session.speakers = function(){
      return modelLoader.allSpeakersById(session.speakerIds)
    }

    return session
  }

  if(module && module.exports){
    module.exports = Session
  } else {
    App.Session = Session
  }
})()

