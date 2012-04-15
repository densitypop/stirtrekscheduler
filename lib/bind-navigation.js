(function($){
  var bindNavigation = function(options){
    var routes = options.routes,
        templates = options.templates,
        modelLoader = options.modelLoader,
        $container = this

    var navigateToPage = function(e){
      e.preventDefault()
      var url = $(e.currentTarget).attr("href")
      if(window.history !== undefined){
        history.pushState(null, null, url)
      }
      if(routes !== undefined){
        routes.router.routeTo(url, $container, templates, modelLoader)
      }
    }
    var selector = options.buttonSelector,
        callback = options.callback || navigateToPage,
        navButtons = $(selector, this)

    this.on("click", selector, callback)
  }

  $.fn.bindNavigation = bindNavigation

})(jQuery)
