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
