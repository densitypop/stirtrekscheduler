(function($){
  var favoritable = function(handler){
    var $button = $(".favorite-button", this),
        sessionId = $button.attr("data-session-id"),
        loadFavorites = function(){
          var favorites = localStorage.getItem("stirtrek-favorites")
          return favorites ? JSON.parse(favorites) : []
        },
        sessionIsAFavorite = function(id){
          var favorites = loadFavorites()
          if(_.include(favorites, sessionId)){
            return true
          } else {
            return false
          }
        }

    handler = handler || function(e){
      var favorites = loadFavorites()
      if(sessionIsAFavorite(sessionId)){
        favorites = _.without(favorites, sessionId)
      } else {
        favorites.push(sessionId)
      }
      localStorage.setItem("stirtrek-favorites", JSON.stringify(favorites))
      $button.toggleClass("saved-favorite")
    }

    this.on("click", ".favorite-button", handler)
    if(sessionIsAFavorite(sessionId)){
      $button.addClass("saved-favorite")
    }
  }

  $.fn.favoritable =  favoritable

})(jQuery);
