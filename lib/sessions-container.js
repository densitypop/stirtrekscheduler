(function($){

  SessionsContainer = function(options){
    var $elm = $(this),
        template = options.template,
        view = Handlebars.compile(template),
        sessions = options.data

    $elm.html(view(sessions))
    return $elm
  }

  $.fn.sessionsContainer = SessionsContainer

  if(module && module.exports){
    module.exports = SessionsContainer
  }
})(jQuery);
