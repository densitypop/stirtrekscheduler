require("./test-helper")
App.Track = function(a) { return a }
App.Session = function(a,b,c) { return {id:a,name:b} }
App.TimeSlot = function(a,b,c) { return {id:a,startTime:b,endTime:c} }
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
      ModelLoader.cachedData = { Tracks: _(tracks) }
      ModelLoader.allTracks().should.eql(actual)
    },
    "loads sessions by track id": function(){
      var sessions = [{Id:1, Name:"Session 1", TrackId:"1"},{Id:2, Name:"Session 2", TrackId:"2"}],
          expected = [{id:1, name:"Session 1"}]
      ModelLoader.cachedData = { Sessions: _(sessions) }
      ModelLoader.sessionsByTrackId("1").should.eql(expected)
    },
    "loads time slots by id": function(){
      var timeSlot = { Id: "1", StartTime: "10:00 AM", EndTime: "11:00 AM" },
          expected = { id: "1", startTime: "10:00 AM", endTime: "11:00 AM" }
      ModelLoader.cachedData = { TimeSlots: _([timeSlot]) }
      ModelLoader.timeSlotById("1").should.eql(expected)
    }
  }
}

