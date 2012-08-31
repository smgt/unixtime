(function() {
  var input = $('#input')
  var form = $('#form')
  input.focus()
  form.submit(function() {
    $.getJSON("/date", {value: input[0].value}, function(data) {
      if(data.error) {
        $('#result').html($('<span class="error">'+data.error+'</span>'))
      } else {
        $('#result').html($('<span class="time-primary">'+data.unixtime+'</span>'+'<span class="time-secondary">'+data.date+'</span>'))
      }
    })
    return false
  })
})()
