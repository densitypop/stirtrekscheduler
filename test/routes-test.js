require("./test-helper")
require("../lib/tracks-container")
Routes = require("../lib/routes")

module.exports = {
  "Routes": {
    beforeAll: function(){
      this.$container = $("<div>", { id: "test-container" })
    },
    "#router": {
      "#routeTo": {
        "calls the requested route": function(){
          Routes["/blah"] = function(){}
          var spy = sinon.spy(Routes, "/blah")
          Routes.router.routeTo("/blah")
          spy.called.should.be.true
        },
        "calls routes with parameters": function(){
          var regex = "/blah/(\\d+)"
          Routes[regex] = function(){}
          var spy = sinon.spy(Routes, regex)
          Routes.router.routeTo("/blah/12")
          spy.calledWith("12").should.be.true
        }
      }
    },
    "/tracks - loads tracks and renders list": function(){
      var template = "<ul>{{#each this}}<li>{{ name }}</li>{{/each}}</ul>",
          ModelLoader = {allTracks: function(){}}
      sinon.stub(ModelLoader, "allTracks", function(){
        return [{name: "Track 1"}, {name: "Track 2"}]
      });
      Routes.router.routeTo("/tracks", this.$container, {tracksList: template}, ModelLoader)
      this.$container.html().should.eql("<ul><li>Track 1</li><li>Track 2</li></ul>")
    },
    "/schedule - loads time slots and renders list": function(){
      var template = "<ul>{{#each this}}<li>{{ startTime }} - {{ endTime }}</li>{{/each}}</ul>",
          ModelLoader = {allTimeSlots: function(){}}
      sinon.stub(ModelLoader, "allTimeSlots", function(){
        return [{startTime: "10:00", endTime: "11:00"},{startTime: "11:00", endTime:"12:00"}]
      })
      Routes.router.routeTo("/schedule", this.$container, {timeSlotsList: template}, ModelLoader)
      this.$container.html().should.eql("<ul><li>10:00 - 11:00</li><li>11:00 - 12:00</li></ul>")
    },
    "/tracks/(\\d+) - displays sessions for the specified track": function(){
      var template = "<ul>{{#each this}}<li>{{ name }}</li>{{/each}}</ul>",
          ModelLoader = {sessionsByTrackId: function(id){}}
      sinon.stub(ModelLoader, "sessionsByTrackId", function(){
        return [{name: "Session 1"}, {name: "Session 2"}]
      });
      Routes.router.routeTo("/tracks/12", this.$container, {trackSessionsList: template}, ModelLoader)
      this.$container.html().should.eql("<ul><li>Session 1</li><li>Session 2</li></ul>")
    },
    "/schedule/(\\d+) - displays sessions for the specified time slot": function(){
      var template = "<ul>{{#each this}}<li>{{ name }}</li>{{/each}}</ul>",
          ModelLoader = {sessionsByTimeSlotId: function(id){}}
      sinon.stub(ModelLoader, "sessionsByTimeSlotId", function(){
        return [{name: "Session 1"}, {name: "Session 2"}]
      })
      Routes.router.routeTo("/schedule/12", this.$container, {scheduleSessionsList: template, scheduleNavigation: ""}, ModelLoader)
      this.$container.html().should.eql("<ul><li>Session 1</li><li>Session 2</li></ul>")
    },
    "/sessions/(\\d+) - displays session details": function(){
      var template = "{{ name }}",
          ModelLoader = {sessionById: function(id){}}
      sinon.stub(ModelLoader, "sessionById", function(){
        return {name: "Session 1"}
      })
      Routes.router.routeTo("/sessions/12", this.$container, {session: template, scheduleNavigation: ""}, ModelLoader)
      this.$container.html().should.eql("Session 1")
    }
  }
}
