(function($){

  TracksContainer = function(options){
    var $elm = $(this),
        templateId = options.templateId,
        template = $("#" + templateId).html(),
        view = Handlebars.compile(template),
        tracks = App.ModelLoader.allTracks()

    $elm.html(view(tracks))
    return $elm
  }

  $.fn.tracksContainer = TracksContainer

  if(module && module.exports){
    module.exports = TracksContainer
  }
})(jQuery)

