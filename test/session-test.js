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
    },
    "loads speakers": function(){
      var speakers = [{id: 1, name:"Joe Bob"}]
      ModelLoader.allSpeakersById = function(ids){
        return speakers
      }
      var session = Session(1, "Test", "", ["1"], 1, 1, [], ModelLoader)
      session.speakers().should.eql(speakers)

    },
    "loads track": function(){
      var track = { id: 1, name: "Blah" }
      ModelLoader.trackById = function(id){
        return track
      }
      var session = Session(1, "Test", "", ["1"], "1", 1, [], ModelLoader)
      session.track().should.eql(track)
    },
    "knows if it is a favorite": function(){
      ModelLoader.favoriteBySessionId = function(id){
        return {id:1,name:"Session 1"}
      }
      var session = Session(1, "Session 1", "", [], "", 1, [], ModelLoader)
      session.isFavorite().should.be.true
    },
    "loads similar sessions": function(){
      var expected = [{id:2,name:"Session 2"}, {id:3,name:"Session 3"}]
      ModelLoader.sessionsByTagNames = function(tagNames){
        return expected
      }
      var session = Session(1, "Session 1", "", [], "", 1, [], ModelLoader)
      session.similarSessions().should.eql(expected)
    }
  }
}

