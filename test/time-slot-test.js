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
    "displays formatted start and end time": function(){
      var timeSlot = TimeSlot(1, "10:00", "11:00")
      timeSlot.startAndEndTime().should.eql("10:00 &ndash; 11:00")
    }
  }
}


