require("./test-helper")
require("../lib/sessions-container")
ModelLoader = require("../models/model-loader")

module.exports = {
  "SessionsContainer": {
    beforeAll: function(){
      var template = $("<script></script>", { type: "text/handlebars", id: "sessions-template" }),
          container = $("<div></div>", { id: "test-container" })
      template.html("{{#each this}}{{name}}{{/each}}")
      template.appendTo("head")
      container.appendTo("body")
    },
    "renders given template with each session": function(){
      var sessions = [{name: "session1"}, {name: "session2"}]
      $("#test-container").sessionsContainer(
          { template: $("#sessions-template").html(), data: sessions })
      $("#test-container").html().should.match(/session1/)
      $("#test-container").html().should.match(/session2/)
    }
  }
}

