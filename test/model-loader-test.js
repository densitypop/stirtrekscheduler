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
      var track = { id: sinon.stub(), name: undefined }
      sinon.stub($, "ajax").yieldsTo("success", [track])
      App.ModelLoader.allTracks(function(result){
        result.should.includeEql(track)
        done()
      })
    }
  }
}

