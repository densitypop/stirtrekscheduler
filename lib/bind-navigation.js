(function($){
  var bindNavigation = function(options){
    var routes = options.routes

    var navigateToPage = function(e){
      var url = $(e.target).attr("href")
      if(routes !== undefined) {
        routes[url].apply()
      }
    }
    var selector = options.buttonSelector,
        callback = options.callback || navigateToPage,
        navButtons = $(selector, this)

    this.on("click", selector, callback)
  }

  $.fn.bindNavigation = bindNavigation

})(jQuery)
