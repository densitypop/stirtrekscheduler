module = null
App = {
  templateMap: function(){
    return {
      'tracksList': $("#tracks-template").html(),
      'timeSlotsList': $("#schedule-template").html(),
      'favoritesList': $("#favorites-list-template").html(),
      'sessionsList': $("#sessions-list-template").html(),
      'session': $("#session-template").html(),
      'overlay': $("#overlay-template").html(),
      'home': $("#home-template").html()
    }
  },
  speakerNamesMap: {
    "Brian H. Prince": "Brian Prince",
    "Eric A. Meyer": "Eric Meyer",
    "Michael S. Collier": "Michael Collier",
    "Robert O’Malley": "Robert O'Malley"
  },
  init: function(){
    Handlebars.registerPartial('speakerPhoto', $("#speaker-photo-partial").html())
    Handlebars.registerPartial('allSpeakerPhotos', $("#all-speaker-photos-partial").html())
    Handlebars.registerPartial('sessionPreview', $("#session-preview-partial").html())
    Handlebars.registerPartial('sessionsList', $("#sessions-list-template").html())

    var overlay = $("body").waitOverlay({ template: App.templateMap().overlay })

    setTimeout(function(){
      overlay.$("h3").html("Enjoy your cake!")
    }, 11000)

    $(document).ajaxStart(function(){
      overlay.show()
    })

    $(document).ajaxStop(function(){
      setTimeout(function(){
        overlay.hide()
      }, 3000)
    })

    App.ModelLoader.init(function(){
      $("#main-content").bindNavigation({
        buttonSelector: ".navigation-button",
        routes: App.Routes,
        router: App.Router,
        templates: App.templateMap(),
        modelLoader: App.ModelLoader
      });
      $("#main-content").show()
    })
  }
};

Handlebars.registerHelper('jsonify', function(obj){
  return JSON.stringify(obj);
});
Handlebars.registerHelper('iconNameFromSession', function(session){
  var trackName = session.track().name
  return trackName[0].toLowerCase();
});
Handlebars.registerHelper('iconName', function(str){
  return str[0].toLowerCase();
});
Handlebars.registerHelper('formattedTime', function(session){
  var timeSlot = session.timeSlot()
  return timeSlot.startTime + " &ndash; " + timeSlot.endTime
})
Handlebars.registerHelper('renderSessionsList', function(sessions){
  var sessionsListPartial = Handlebars.compile(Handlebars.partials.sessionsList)
  return sessionsListPartial(sessions)
})
Handlebars.registerHelper('allSpeakersNames', function(session){
  var speakers = session.speakers()
  return speakers.map(function(speaker){ return speaker.name }).join(", ")
})
Handlebars.registerHelper('firstSpeakerName', function(session){
  var speakers = session.speakers()
  return speakers[0].name
})
Handlebars.registerHelper('withoutSpeaker', function(fn){
  if(this.speakers().length === 0){
    return fn(this)
  }
})
Handlebars.registerHelper('withSpeaker', function(fn){
  if(this.speakers().length > 0){
    return fn(this)
  }
})
Handlebars.registerHelper('trackName', function(session){
  return session.track().name
})
Handlebars.registerHelper('speakers', function(fn){
  var result =
    _(this.speakers()).map(function(speaker){
      return fn(speaker)
    })
  return result.join("\n")
})
Handlebars.registerHelper('firstSpeakerPhotoUrl', function(session){
  return session.speakers()[0].photoUrl
})
Handlebars.registerHelper('nonEmptyList', function(fn){
  if(this.length > 0){
    return fn(this)
  }
})
Handlebars.registerHelper('emptyList', function(fn){
  if(this.length === 0){
    return fn(this)
  }
})
Handlebars.registerHelper('whenFavorite', function(session, fn){
  if(session.isFavorite()){
    return fn(session)
  }
})
Handlebars.registerHelper('similarSessions', function(session, fn){
  var result = _.map(session.similarSessions(), function(similar){
    similar.isOriginalSession = (similar.id == session.id)
    return fn(similar)
  })
  return result.join("\n")
});
