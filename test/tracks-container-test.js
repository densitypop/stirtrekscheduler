require("./test-helper")
require("../lib/tracks-container")

module.exports = {
  "TracksContainer": {
    beforeAll: function(){
      var template = $("<script></script>", { type: "text/handlebars", id: "tracks-template" }),
          container = $("<div></div>", { id: "test-container" })
      template.html("{{#each this}}{{name}}{{/each}}")
      template.appendTo("head")
      container.appendTo("body")
    },
    "renders given template with each track": function(){
      sinon.stub(App.ModelLoader, "allTracks", function(){
        return [{name: "track1"}, {name: "track2"}]
      })
      $("#test-container").tracksContainer(
          { templateId: "tracks-template" })
      $("#test-container").html().should.match(/track1/)
      $("#test-container").html().should.match(/track2/)
    }
  }
}
