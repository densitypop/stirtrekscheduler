(function($){

  TracksContainer = function(options){
    var $elm = $(this),
        template = options.template,
        view = Handlebars.compile(template),
        tracks = options.modelLoader.allTracks()

    $elm.html(view(tracks))
    return $elm
  }

  $.fn.tracksContainer = TracksContainer

  if(module && module.exports){
    module.exports = TracksContainer
  }
})(jQuery)

