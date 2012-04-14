require("./test-helper")
App.Track = require("../models/track")

module.exports = {
  Track: {
    "can set name and id on creation": function(){
      var track = App.Track(1, "Test")
      track.id.should.eql(1)
      track.name.should.eql("Test")
    }
  }
}
