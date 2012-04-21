(function(){
  var routes = {
    '/home': function(options){
      var template = options.templateMap.home,
          view = Handlebars.compile(template)
      options.$container.html(view())
    },
    '/tracks': function(options){
      options.template = options.templateMap.tracksList
      options.$container.tracksContainer(options)
    },
    '/tracks/(\\d+)': function(id, options){
      options.template = options.templateMap.sessionsList
      options.data = options.modelLoader.sessionsByTrackId(id)
      options.$container.sessionsContainer(options)
    },
    '/schedule': function(options){
      options.template = options.templateMap.timeSlotsList
      var view = Handlebars.compile(options.template)
      options.$container.html(view(options.modelLoader.allTimeSlots()))
    },
    '/schedule/(\\d+)': function(id, options){
      options.template = options.templateMap.sessionsList
      options.data = options.modelLoader.sessionsByTimeSlotId(id)
      options.$container.sessionsContainer(options)
    },
    '/sessions/(\\d+)': function(id, options){
      options.template = options.templateMap.session
      var data = options.modelLoader.sessionById(id),
          view = Handlebars.compile(options.template)
      options.$container.html(view(data))
      $(".favorite").favoritable()
    },
    '/favorites': function(options){
      options.template = options.templateMap.favoritesList
      var data = options.modelLoader.favoriteSessions(),
          view = Handlebars.compile(options.template)
      options.$container.html(view(data))
    }
  }
  var router = {
    routeTo: function(fragment, $container, templateMap, modelLoader){
      var options = {}
      options.$container = $container
      options.templateMap = templateMap
      options.modelLoader = modelLoader
      var _routes = _(_(routes).keys()),
          route = _routes.select(function(route){
        var comparison = new RegExp("^" + route + "$")
        var match = fragment.match(comparison)
        if(match && match.length > 1){
          routes[route].call({}, match[1], options)
          return true;
        } else if(match){
          routes[route].call({}, options)
          return true;
        }
        return false
      });
      if(route.length == 0){
        throw "No route found"
      }
    },
    matches: function(route, comparison){
      var match = comparison.match(route);
      return match;
    },
    start: function(fragment, $container, templates, modelLoader){
      this.routeTo(fragment, $container, templates, modelLoader)
    }
  }
  routes.router = router

  if(module && module.exports){
    module.exports = routes
  } else {
    App.Routes = routes
    App.Router = router
  }
})()
