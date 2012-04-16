require("./test-helper")
TimeSlot = require("../models/time-slot")

module.exports = {
  TimeSlot: {
    "can set id, start time and end time on creation": function(){
      var timeSlot = TimeSlot(1, "10:00", "11:00")
      timeSlot.id.should.eql(1)
      timeSlot.startTime.should.eql("10:00")
      timeSlot.endTime.should.eql("11:00")
    },
    "returns 24 hour time for sorting": function(){
      var timeSlot = TimeSlot(1, "1:00 PM", "2:00 PM")
      timeSlot.sortVal().should.eql(13)
      timeSlot = TimeSlot(1, "10:00 AM", "11:00 AM")
      timeSlot.sortVal().should.eql(10)
    }
  }
}


