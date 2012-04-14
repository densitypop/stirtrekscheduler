(function(){
  var routes = {
    '/tracks': function($container, templateMap, modelLoader){
      var template = templateMap.tracksList,
          compiled = Handlebars.compile(template),
          renderTracks = function(tracks){
            $container.html(compiled(tracks))
          },
          tracks = modelLoader.allTracks(renderTracks)
    }
  }

  if(module && module.exports){
    module.exports = routes
  } else {
    App.Routes = routes
  }
})()
