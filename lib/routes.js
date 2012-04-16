(function(){
  var routes = {
    '/tracks': function(options){
      options.template = options.templateMap.tracksList
      options.$container.tracksContainer(options)
    },
    '/tracks/(\\d+)': function(id, options){
      options.template = options.templateMap.sessionsList
      options.trackId = id
      options.$container.sessionsContainer(options)
    },
    '/schedule': function(options){
      options.template = options.templateMap.timeSlotsList
      var view = Handlebars.compile(options.template)
      options.$container.html(view(options.modelLoader.allTimeSlots()))
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
