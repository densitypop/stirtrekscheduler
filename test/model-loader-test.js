require("./test-helper")
App.Track = function(a) { return a }
App.Session = function(a,b,c) { return {id:a,name:b} }
App.Speaker = function(a,b,c) { return {id:a,name:b} }
App.TimeSlot = require("../models/time-slot")
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
          expected = App.TimeSlot("1", "10:00 AM", "11:00 AM")
      ModelLoader.cachedData = { TimeSlots: _([timeSlot]) }
      ModelLoader.timeSlotById("1").id.should.eql(expected.id)
    },
    "loads speakers matching multiple ids": function(){
      var speakers = [{ Id: "1", Name: "Joe Bob" },
                      { Id: "2", Name: "Jim Bim" },
                      { Id: "3", Name: "Sam Slam" }],
          expected = [{id:"1",name:"Joe Bob"},{id:"3",name:"Sam Slam"}]
      ModelLoader.cachedData = { Speakers: _(speakers) }
      ModelLoader.allSpeakersById(["1","3"]).should.eql(expected)
    },
    "loads all time slots sorted ascending": function(){
      var timeSlots = [{ Id: "1", StartTime: "11:00 AM", EndTime: "12:00 PM" },
                       { Id: "2", StartTime: "10:00 AM", EndTime: "11:00 AM" },
                       { Id: "3", StartTime: "12:00 PM", EndTime: "1:00 PM" }],
          expected = [App.TimeSlot("2", "10:00 AM", "11:00 AM"),
                      App.TimeSlot("1", "11:00 AM", "12:00 PM"),
                      App.TimeSlot("3", "12:00 PM", "1:00 PM")]
      ModelLoader.cachedData = { TimeSlots: _(timeSlots) }
      ModelLoader.allTimeSlots().map(function(timeSlot){ return timeSlot.id }).
        should.eql(expected.map(function(timeSlot){ return timeSlot.id }))
    }
  }
}

