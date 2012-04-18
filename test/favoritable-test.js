require("./test-helper")
require("../lib/favoritable")

module.exports = {
  "favoritable": {
    beforeAll: function(){
      this.$elm = $("<p class='favorite'><div data-session-id='1' class='favorite-button'></div></p>");
      this.$button = $(".favorite-button", this.$elm)
    },
    afterEach: function(){
      var restoreIfWrapped = function(fn){
        if(typeof fn.restore === "function"){
          fn.restore()
        }
      }
      restoreIfWrapped(localStorage.setItem)
      restoreIfWrapped(localStorage.getItem)
    },
    "handles click event on favorite button": function(){
      var spy = sinon.spy()
      this.$elm.favoritable(spy)
      $(".favorite-button", this.$elm).click()
      spy.calledOnce.should.be.true
    },
    "not a favorite": {
      "saves favorite to local store using data-session-id": function(){
        var spy = sinon.spy(localStorage, "setItem")
        this.$elm.favoritable()
        $(".favorite-button", this.$elm).click()
        spy.calledWith('stirtrek-favorites', '["1"]').should.be.true
      },
      "assigns class to button after saving favorite": function(){
        sinon.stub(localStorage, "setItem")
        this.$elm.favoritable()
        this.$button.click()
        this.$button.hasClass("saved-favorite").should.be.true
      },
      "works with null value in local storage": function(){
        sinon.stub(localStorage, "getItem", function(){
          return null
        })
        this.$elm.favoritable()
        var $button = this.$button,
            expected = function(){
              $button.click()
            }
        expected.should.not.throw()
      },
    },
    "already a favorite": {
      "removes favorite from local store using data-session-id": function(){
        var spy = sinon.spy(localStorage, "setItem")
        sinon.stub(localStorage, "getItem", function(){
          return '["1"]'
        })
        this.$elm.favoritable()
        this.$button.click()
        spy.calledWith('stirtrek-favorites', '[]').should.be.true
        localStorage.setItem.restore()
        localStorage.getItem.restore()
      },
      "sets favorite property on session": function(){
        this.$button.removeClass("saved-favorite")
        sinon.stub(localStorage, "getItem", function(){
          return '["1"]'
        })
        this.$elm.favoritable()
        this.$button.hasClass("saved-favorite").should.be.true
      }
    }
  }
}
