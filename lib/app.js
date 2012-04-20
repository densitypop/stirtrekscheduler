module = null
App = {
  templateMap: function(){
    return {
      'tracksList': $("#tracks-template").html(),
      'timeSlotsList': $("#schedule-template").html(),
      'tracksNavigation': $("#tracks-navigation-template").html(),
      'trackSessionsList': $("#track-sessions-list-template").html(),
      'scheduleSessionsList': $("#schedule-sessions-list-template").html(),
      'favoritesList': $("#favorites-list-template").html(),
      'session': $("#session-template").html(),
      'home': $("#home-template").html()
    }
  },
  init: function(){
    Handlebars.registerPartial('speakerPhoto', $("#speaker-photo-partial").html())
    Handlebars.registerPartial('allSpeakerPhotos', $("#all-speaker-photos-partial").html())
    Handlebars.registerPartial('sessionsList', $("#sessions-list-partial").html())
    App.ModelLoader.init(function(){
      $("#main-content").bindNavigation({
        buttonSelector: ".navigation-button",
        routes: App.Routes,
        router: App.Router,
        templates: App.templateMap(),
        modelLoader: App.ModelLoader
      });
    })
  }
};

Handlebars.registerHelper('jsonify', function(obj){
  return JSON.stringify(obj);
});
Handlebars.registerHelper('toClassName', function(str){
  return str.toLowerCase();
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
  var url = "http://www.stirtrek.com/Content/Images/Speakers/"
  var speakers = session.speakers(),
      speakerName = speakers[0].name

  url += (speakerName == "Brian H. Prince" ? "Brian Prince" : speakerName)
  if(speakerName.match(/Weirich$|Sell$/)){
    url += ".jpg"
  } else {
    url += ".png"
  }
  return url
})
Handlebars.registerHelper('whenFavorite', function(session, fn){
  if(session.isFavorite()){
    return fn(session)
  }
})
Handlebars.registerHelper('similarSessions', function(session, fn){
  var result = _.map(session.similarSessions(), function(similar){
    return fn(similar)
  })
  return result.join("\n")
})
