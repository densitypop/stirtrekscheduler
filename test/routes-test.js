require("./test-helper")
Routes = require("../lib/routes")

module.exports = {
  "Routes": {
    "/tracks - loads tracks and renders list": function(done){
      var $container = $("<div>", { id: "test-container" }),
          template = "<ul>{{#each this}}<li>{{ name }}</li>{{/each}}</ul>",
          ModelLoader = {allTracks: function(){}}
      sinon.stub(ModelLoader, "allTracks", function(callback){
        var tracks = [{name: "Track 1"}, {name: "Track 2"}]
        callback(tracks)
        done()
      });
      Routes['/tracks'].call({}, $container, {tracksList: template}, ModelLoader)
      $container.html().should.eql("<ul><li>Track 1</li><li>Track 2</li></ul>")
    }
  }
}
