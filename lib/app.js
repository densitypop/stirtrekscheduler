module = null
App = {
  templateMap: function(){
    return {
      'tracksList': $("#tracks-template").html(),
      'sessionsList': $("#sessions-list-template").html()
    }
  },
  init: function(){
    App.ModelLoader.init()
    $("#main-content").bindNavigation({
      buttonSelector: ".nav-button",
      routes: App.Routes,
      templates: App.templateMap(),
      modelLoader: App.ModelLoader
    });
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
Handlebars.registerHelper('allSpeakersNames', function(session){
  var speakers = session.speakers()
  return speakers.map(function(speaker){ return speaker.name }).join(", ")
})
Handlebars.registerHelper('firstSpeakerName', function(session){
  var speakers = session.speakers()
  return speakers[0].name
})
Handlebars.registerHelper('firstSpeakerPhotoUrl', function(session){
  var url = "http://www.stirtrek.com/Content/Images/Speakers/"
  var speakers = session.speakers(),
      speakerName = speakers[0].name

  url += speakerName
  if(speakerName.match(/Weirich$|Sell$/)){
    url += ".jpg"
  } else {
    url += ".png"
  }
  return url
})
