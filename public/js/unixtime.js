(function() {
  var input = $('#input')
  var form = $('#form')
  var offset = "+00:00"
  var d = new Date()
  var hoursOffset = (d.getTimezoneOffset()/60).toString();
  if (hoursOffset.length === 2) {
    offset = hoursOffset.charAt(0)+"0"+hoursOffset.charAt(1)+":00"
  } else if(hoursOffset.length === 3) {
    offset = hoursOffset+":00"
  }
  input.focus()
  form.submit(function() {
    $.getJSON("/date", {value: input[0].value, offset: offset}, function(data) {
      if(data.error) {
        $('#result').html($('<span class="error">'+data.error+'</span>'))
      } else {
        $('#result').html($('<span class="time-primary">'+data.unixtime+'</span>'+'<span class="time-secondary">'+data.date+'</span>'))
      }
    })
    return false
  })
})()
