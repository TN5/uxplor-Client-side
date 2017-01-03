$(document).ready(function(){
  $('select').material_select();
  $.get('types.txt', function(data) {
    data = data.split('\n');
    data.forEach(function(i) {
      $('select.select').append(`<option class="option">${i}</option>`)
    })
    $('select').material_select();
  })

  $('.button-collapse').sideNav({
    menuWidth: 300,
    edge: 'left',
    closeOnClick: true,
    draggable: true
  });

})

var longitude;
var latitude;
var type = 'bar';

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  latitude = crd.latitude;
  longitude = crd.longitude;

  $('#param-submit').click(function() {
    var radius = parseInt($('#radius').val()) * .3048;
    var type = $('select.select').val();
    if (type != '' && !isNaN(radius)){
      var url = `http://localhost:3000/getlist?location=${latitude},${longitude}&radius=${radius}&type=${type}`;
      $.get(url, function(data) {
        console.log(data);
      });
    } else {
      alert("Invalid Input");
    }
  })
};

function error(err) {
  // console.warn(ERROR(`(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);
setInterval(function (){
  navigator.geolocation.getCurrentPosition(success, error, options);
}, 6000)

$('#walk-btn').click(function() {
  $('#radius').val('1000');
  $('#radius-label').hide();
});

$('#bike-btn').click(function() {
  $('#radius').val('6000');
  $('#radius-label').hide();
});

$('#car-btn').click(function() {
  $('#radius').val('12000');
  $('#radius-label').hide();
});

$('#incrementer').click(function() {
  changeRadius(1);
});

$('#decrementer').click(function() {
  changeRadius(-1);
});

function changeRadius(coef) {
  var change = 100;
  var radius = parseInt($('#radius').val());
  if(radius >= 6000) {
    change = 1000;
  } else if(radius >= 2000) {
    change = 200;
  }
  radius += (change * coef);
  $('#radius').val(`${radius}ft`);
}
