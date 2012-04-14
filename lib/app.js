$.fn.setupNavigation = function(){
  return this.each(function(){
    var $this = $(this);
    $this.on("click", ".nav-button", function(e){
      console.log(e.target);
      var $elm = $(e.target);
      e.preventDefault();
      var url = $elm.attr("href");
      var templateId = $elm.attr("data-template-id");
      $(document).trigger("blah.diddy", [templateId]);
    });
  });
};

App = {
  init: function(){
    $("#main-content").setupNavigation();
    App.loadData();
  },
  loadData: function(){
    if(App.cachedData) return App.cachedData;

    $.get("http://stirtrek.com/Feed/JSON", function(response){
      App.cachedData = response;
    });

  }
};

$(document).bind("blah.diddy", function(e, templateId){
  var objectMethod = null,
      content = $("#" + templateId).html(),
      template;

  switch(templateId){
    case "tracks-template":
      objectMethod = "Tracks";
      break;
    case "schedule-template":
      objectMethod = "TimeSlots";
      break;
    case "talk-list-template":
      object = Session.findByTrackId(
  }

  template = Handlebars.compile(content);

  $("#main-content").html(template(App.cachedData[objectMethod]));
});

Handlebars.registerHelper('toClassName', function(str){
  return str.toLowerCase();
});
