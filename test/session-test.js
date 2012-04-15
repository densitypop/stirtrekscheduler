require("./test-helper")
Session = require("../models/session")

module.exports = {
  Session: {
    "can set id, name, abstract, speaker ids, time slot id, track id and tags on creation": function(){
      var session = Session(1, "Test", "Blah blah", [1,2,3], 1, 2, ["tag"])
      session.id.should.eql(1)
      session.name.should.eql("Test")
      session.abstract.should.eql("Blah blah")
      session.speakerIds.should.eql([1,2,3])
      session.timeSlotId.should.eql(1)
      session.trackId.should.eql(2)
      session.tags.should.eql(["tag"])

    },
    "loads time slot by id": function(){
      var timeSlot = { id: 1, startTime: "10:00 AM", endTime: "11:00 AM" }
      ModelLoader.timeSlotById = function(){
        return timeSlot;
      }
      var session = Session(1, "Test", "", [], 1, 1, [], ModelLoader)
      session.timeSlot().should.eql(timeSlot)
    }
  }
}

