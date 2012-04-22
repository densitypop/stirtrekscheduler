(function($){
  var bindNavigation = function(options){
    var routes = options.routes,
        router = options.router,
        templates = options.templates,
        modelLoader = options.modelLoader,
        $container = this

    var navigateToPage = function(e){
      e.preventDefault()
      var $elm = $(e.currentTarget),
          url = $elm.attr("href")

      $elm.setActive()

      if(window.history !== undefined){
        history.pushState(null, null, url)
      }
      if(routes !== undefined){
        router.routeTo(url, $container, templates, modelLoader)
      }
    }
    var selector = options.buttonSelector,
        callback = options.callback || navigateToPage,
        navButtons = $(selector, this)

    $(".primary-navigation").on("click", selector, callback)

    window.onpopstate = function(e){
      var pathname = window.location.pathname
      if(pathname){
        router.routeTo(pathname, $container, templates, modelLoader)
      }
    }
    var pathname = window.location.pathname
    $("a[href='" + pathname + "']").setActive()
    router.start(pathname, $container, templates, modelLoader)
  }

  var setActive = function(){
    $(".navigation-item").removeClass("is-active")
    this.parents(".navigation-item").addClass("is-active")
  }

  $.fn.bindNavigation = bindNavigation
  $.fn.setActive = setActive

})(jQuery);
