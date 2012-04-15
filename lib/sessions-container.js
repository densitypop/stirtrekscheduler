(function($){

  SessionsContainer = function(options){
    var $elm = $(this),
        template = options.template,
        view = Handlebars.compile(template),
        sessions = options.modelLoader.sessionsByTrackId(options.trackId)

    $elm.html(view(sessions))
    return $elm
  }

  $.fn.sessionsContainer = SessionsContainer

  if(module && module.exports){
    module.exports = SessionsContainer
  }
})(jQuery)


