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
var placesRay = [];
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  latitude = crd.latitude;
  longitude = crd.longitude;
};

$('#param-submit').click(function() {
  var radius = parseInt($('#radius').val()) * .3048;
  var type = $('select.select').val();
  if (type != '' && !isNaN(radius)){
    var url = `https://uxplor.herokuapp.com/getlist?location=${latitude},${longitude}&radius=${radius}&type=${type}`;
    $.get(url, function(data) {
      data = JSON.parse(data);
      placesRay = data.results;
      console.log(placesRay);

      let str = `You have ${placesRay.length} locations to chose from, or you may start a new search!`;
      $('#play-btn').css('display', 'block');
      if(placesRay.length === 0) {
        str = `You have 0 locations to chose from. Start a new search!`;
        $('#play-btn').css('display', 'none');
      } else if(placesRay.length === 0) {
        str = `You have a single locations to chose from or you may start a new search!`;
      }
      $('#location-shower').text(str);

      $('#available-locations').fadeOut(10);
      $('#location-number').val(Math.min(placesRay.length, 10));

      $('.params-page').fadeOut(250);
      $('.game-setup').delay(250).fadeIn(250);
    });
  } else {
    alert("Invalid Input");
  }
})

function error(err) {
  console.warn(`ERROR${err.code}: ${err.message}`);
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

$('#incrementer2').click(function() {
  changePlaceCount(1);
});

$('#decrementer2').click(function() {
  changePlaceCount(-1);
});

function changePlaceCount(inc) {
  var placeCount = parseInt($('#location-number').val()) + inc;
  console.log(placeCount);
  if (placeCount < placesRay.length + 1 && placeCount >= 1) {
    $('#location-number').val(placeCount);
  }
}
