require("./test-helper")
require("../lib/bind-navigation")

module.exports = {
  "bindNavigation": {
    beforeEach: function(){
      this.$container = $("<div class='primary-navigation'>", { id: "test-container" })
      this.$link = $("<a class='nav-button' href='#'></a>")

      this.router = { start: function(){ }, routeTo: function(){ } }

      this.$container.append(this.$link).appendTo("body")
    },
    afterEach: function(){
      delete this.$container
      delete this.$link
      delete this.router
    },
    "binds to click on specified links": function(){
      var linkSpy = sinon.spy()

      this.$container.bindNavigation({ buttonSelector: ".nav-button",
                                       callback: linkSpy,
                                       router: this.router })
      this.$link.click()
      linkSpy.calledOnce.should.be.true
    },
    "binds to specific URLs with callbacks": function(){
      var linkSpy = sinon.spy(),
          href = "/blah",
          routes = {},
          router = _.clone(this.router)
      _.extend(router, {
        routeTo: function(url){
          routes[url].call({})
        }
      })
      this.$link.attr("href", href)
      routes[href] = linkSpy
      this.$container.bindNavigation({ buttonSelector: "a",
                                       routes: routes,
                                       router: router })
      this.$link.click()
      linkSpy.calledOnce.should.be.true
    },
    "sets active navigation item when clicked": function(){
      var routes = {}
      this.$link.wrap("<div class='navigation-item'>")
      this.$container.bindNavigation({ buttonSelector: "a", routes: routes, router: this.router })
      this.$link.click()
      this.$link.parents(".navigation-item").hasClass("is-active").should.be.true
    },
    "unsets previously active navigation item": function(){
      var $link2 = $("<a class='nav-button' href='#'></a>")
      $link2.appendTo(this.$container)
      this.$link.wrap("<div class='navigation-item is-active'>")
      $link2.wrap("<div class='navigation-item is-active'>")
      this.$container.bindNavigation({ buttonSelector: "a", router: this.router })
      $link2.click()
      this.$link.parents(".navigation-item").hasClass("is-active").should.be.false
    }
  }
}
