(function(){
  var TimeSlot = function(id, startTime, endTime){
    var timeSlot = {}

    timeSlot.id = id
    timeSlot.startTime = startTime
    timeSlot.endTime = endTime

    timeSlot.sortVal = function(){
      var hour = timeSlot.startTime.split(":")[0]
      hour = parseInt(hour)
      if(hour < 6 && hour > 0){
        hour += 12
      }
      return hour
    }

    return timeSlot
  }

  if(module && module.exports){
    module.exports = TimeSlot
  } else {
    App.TimeSlot = TimeSlot
  }
})();
