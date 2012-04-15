require("./test-helper")
App.Track = function(a) { return a }
ModelLoader = require("../models/model-loader")

module.exports = {
  "ModelLoader": {
    "loads data via ajax": function(){
      var spy = sinon.spy($, "ajax")
      ModelLoader.init()
      spy.calledOnce.should.be.true
      $.ajax.restore()
    },
    "loads tracks from cached data": function(){
      var tracks = [{Id: 1, Name:"Track 1"},{Id: 2, Name: "Track 2"}],
          actual = [{id: 1, name:"Track 1"},{id: 2, name: "Track 2"}]
      ModelLoader.cachedData = { _wrapped: { Tracks: tracks } }
      ModelLoader.allTracks().should.eql(actual)
    }
  }
}

