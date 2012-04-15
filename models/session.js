(function(){
  var Session = function(id, name, abstract, speakerIds, timeSlotId, trackId, tags){
    var session = {}

    session.id = id
    session.name = name
    session.abstract = abstract
    session.speakerIds = speakerIds
    session.timeSlotId = timeSlotId
    session.trackId = trackId
    session.tags = tags

    return session
  }

  if(module && module.exports){
    module.exports = Session
  } else {
    App.Session = Session
  }
})()

