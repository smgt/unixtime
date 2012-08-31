(function($) {
    $.QueryString = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);


(function() {
  var input = $('#input')
  var form = $('#form')

  var getDate = function(value, offset) {

    if(offset===undefined) {
      offset = "+00:00"
    }

    $.getJSON("/date", {value: value, offset: offset}, function(data) {
      if(data.error) {
        $('#result').html($('<span class="error">'+data.error+'</span>'))
      } else {
        $('#result').html($('<span class="time-primary">'+data.unixtime+'</span>'+'<span class="time-secondary">'+data.date+'</span>'))
      }
    })
  }

  input.focus()

  if($.QueryString['value'] !== undefined) {
    getDate($.QueryString['value'], $.QueryString['offset'])
    input[0].value = $.QueryString['value']
  }

  form.submit(function() {

    var d = new Date()
    var hoursOffset = (d.getTimezoneOffset()/60).toString();

    if (hoursOffset.length === 2) {
      offset = hoursOffset.charAt(0)+"0"+hoursOffset.charAt(1)+":00"
    } else if(hoursOffset.length === 3) {
      offset = hoursOffset+":00"
    }

    getDate(input[0].value, offset)
    return false
  })
})()
