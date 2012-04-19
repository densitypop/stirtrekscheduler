require("./test-helper")
App.Track = function(a,b) { return {id:a,name:b} }
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
      var previous = App.Session
      App.Session = function(a,b,c,d,e,f,g) { return {id:a,name:b,trackId:f} }
      var sessions = [{Id:1, Name:"Session 1", TrackId:"1"},{Id:2, Name:"Session 2", TrackId:"2"}],
          expected = [{id:1, name:"Session 1", trackId:"1"}]
      ModelLoader.cachedData = { Sessions: _(sessions) }
      ModelLoader.sessionsByTrackId("1").should.eql(expected)
      App.Session = previous
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
    },
    "loads all sessions sorted by time slot ascending": function(){
      var sessions = [{id:1, name:"Session 1", timeSlotId:"1"},{id:2, name:"Session 2", timeSlotId:"2"},{id:3, name:"Session 3", timeSlotId:"3"}]
      sessions[0].timeSlot = function(){
        return App.TimeSlot("1", "11:00 AM", "12:00 PM")
      }
      sessions[1].timeSlot = function(){
        return App.TimeSlot("2", "10:00 AM", "11:00 AM")
      }
      sessions[2].timeSlot = function(){
        return App.TimeSlot("3", "12:00 PM", "1:00 PM")
      }
      var expected = [{ id:2,name:"Session 2"}, {id:1,name:"Session 1"},{id:3,name:"Session 3"}]
      ModelLoader._allSessions = function(){ return _(sessions) }
      ModelLoader.allSessions().map(function(session){ return session.id }).
        should.eql(expected.map(function(session){ return session.id }))
    },
    "loads all sessions by time slot id": function(){
      var sessions = [{id:1, name:"Session 1", timeSlotId:"1"},{id:2, name:"Session 2", timeSlotId:"2"}],
          expected = [sessions[0]]
      ModelLoader.allSessions = function(){ return _(sessions) }
      ModelLoader.sessionsByTimeSlotId("1").should.eql(expected)
    },
    "loads session by id": function(){
      var sessions = [{id:1, name:"Session 1"},{id:2, name:"Session 2"}],
          expected = {id:1, name:"Session 1"}
      sinon.stub(ModelLoader, "allSessions", function(){
        return _(sessions)
      })
      ModelLoader.sessionById("1").should.eql(expected)
        ModelLoader.allSessions.restore()
    },
    "loads a track by id": function(){
      var tracks = [{Id:"1", Name:"Track 1"},{Id:2, Name:"Track 2"}],
          expected = {id:"1", name:"Track 1"}
      ModelLoader.cachedData = { Tracks: _(tracks) }
      ModelLoader.trackById("1").should.eql(expected)
    },
    "loads favorite sessions": function(){
      var sessions = [{id:1, name:"Session 1"},{id:"2", name:"Session 2"}],
          expected = [{id:1, name:"Session 1"}]
      sinon.stub(localStorage, "getItem", function(){
        return '["1"]'
      })
      sinon.stub(ModelLoader, "allSessions", function(){
        return _(sessions)
      })
      ModelLoader.favoriteSessions().should.eql(expected)
      localStorage.getItem.restore()
      ModelLoader.allSessions.restore()
    },
    "loads favorite session by session id": function(){
      var sessions = [{Id:1, Name:"Session 1"},{Id:"2", Name:"Session 2"}],
          expected = {id:1, name:"Session 1"}
      sinon.stub(ModelLoader, "favoriteSessions", function(){
        return [expected]
      })
      ModelLoader.cachedData = { Sessions: _(sessions) }
      ModelLoader.favoriteBySessionId(1).should.eql(expected)
    },
    "loads sessions by tags": function(){
      var sessions = [{id:"1", name:"Session 1", tags:["tag1", "tag2"]},{id:"2", name:"Session 2", tags:["tag2"]}],
          expected = [{id:"1", name:"Session 1",tags:["tag1","tag2"]}]
      sinon.stub(ModelLoader, "allSessions", function(){
        return _(sessions)
      })
      ModelLoader.sessionsByTagNames(["tag1"]).should.eql(expected)
      ModelLoader.allSessions.restore()
    }
  }
}

