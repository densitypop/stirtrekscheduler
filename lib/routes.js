(function(){
  var routes = {
    '/tracks': function(options){
      var template = options.templateMap.tracksList,
          compiled = Handlebars.compile(template),
          renderTracks = function(tracks){
            options.$container.html(compiled(tracks))
          },
          tracks = options.modelLoader.allTracks(renderTracks)
    },
    '/tracks/(\\d+)': function(id, options){
      var template = options.templateMap.sessionsList,
          compiled = Handlebars.compile(template),
          sessions = options.modelLoader.sessionsByTrackId(id)
      options.$container.html(compiled(sessions))
    }
  }
  var router = {
    routeTo: function(fragment, $container, templateMap, modelLoader){
      var options = {}
      options.$container = $container
      options.templateMap = templateMap
      options.modelLoader = modelLoader
      var _routes = _(_(routes).keys())
      _routes.select(function(route){
        var comparison = new RegExp("^" + route + "$")
        var match = fragment.match(comparison)
        if(match && match.length > 1){
          routes[route].call({}, match[1], options)
          return true;
        } else if(match){
          routes[route].call({}, options)
          return true;
        }
        return false;
      });
    },
    matches: function(route, comparison){
      var match = comparison.match(route);
      return match;
    }
  }
  routes.router = router

  if(module && module.exports){
    module.exports = routes
  } else {
    App.Routes = routes
    App.router = router
  }
})()
