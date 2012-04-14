require("./test-helper")
require("../lib/bind-navigation")

module.exports = {
  "bindNavigation": {
    beforeAll: function(){
      this.$container = $("<div>", { id: "test-container" })
      this.$link = $("<a class='nav-button' href='#'></a>")

      this.$container.append(this.$link).appendTo("body")
    },
    "binds to click on specified links": function(){
      var linkSpy = sinon.spy()

      this.$container.bindNavigation({ buttonSelector: ".nav-button", callback: linkSpy })
      this.$link.click()
      linkSpy.calledOnce.should.be.true
    },
    "binds to specific URLs with callbacks": function(){
      var linkSpy = sinon.spy(),
          href = "/blah",
          routes = {}
      this.$link.attr("href", href)
      routes[href] = linkSpy
      this.$container.bindNavigation({ buttonSelector: "a", routes: routes })
      this.$link.click()
      linkSpy.calledOnce.should.be.true
    }
  }
}
