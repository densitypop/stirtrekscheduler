require("./test-helper")
Session = require("../models/session")

module.exports = {
  Track: {
    "can set id, name, abstract, speaker ids, time slot id, track id and tags on creation": function(){
      var session = Session(1, "Test", "Blah blah", [1,2,3], 1, 2, ["tag"])
      session.id.should.eql(1)
      session.name.should.eql("Test")
      session.abstract.should.eql("Blah blah")
      session.speakerIds.should.eql([1,2,3])
      session.timeSlotId.should.eql(1)
      session.trackId.should.eql(2)
      session.tags.should.eql(["tag"])

    }
  }
}

