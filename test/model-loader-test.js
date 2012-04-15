require("./test-helper")
App.Track = function(a) { return a }
App.ModelLoader = require("../models/model-loader")

module.exports = {
  "ModelLoader": {
    afterEach: function(){
      $.ajax.restore()
    },
    "loads tracks via ajax": function(){
      var spy = sinon.spy($, "ajax")
      App.ModelLoader.allTracks()
      sinon.assert.calledOnce(spy)
    },
    "loads all tracks": function(done){
      var track = { Id: 1, Name: "blah" }
      sinon.stub($, "ajax").yieldsTo("success", { Tracks: [track] })
      App.ModelLoader.allTracks(function(result){
        result.should.includeEql({ id: 1, name: "blah" })
        done()
      })
    }
  }
}

