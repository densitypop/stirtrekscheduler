(function($){

  var waitOverlay = function(options){
    var $container = this,
        $template = options.template,
        $overlay = Handlebars.compile($template)

    $container.prepend($overlay())

    overlay = {
      show: function(){
        $(".overlay", $container).fadeIn("slow")
      },
      hide: function(){
        $(".overlay", $container).fadeOut("slow")
      },
      $: function(arg){
        var $overlay = $(".overlay", $container)
        return $(arg, $overlay)
      }
    }

    return overlay;
  }

  $.fn.waitOverlay = waitOverlay
})(jQuery);
