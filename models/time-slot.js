(function(){
  var TimeSlot = function(id, startTime, endTime){
    var timeSlot = {}

    timeSlot.id = id
    timeSlot.startTime = startTime
    timeSlot.endTime = endTime

    return timeSlot
  }

  if(module && module.exports){
    module.exports = TimeSlot
  } else {
    App.TimeSlot = TimeSlot
  }
})()


