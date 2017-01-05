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
  $('#param-submit').css('display', 'inline')
};

$('#param-submit').click(function() {
  var radius = parseInt($('#radius').val()) * .3048;
  var type = $('select.select').val();
  if (type != '' && !isNaN(radius)){
    $('#param-submit').attr('href', 'game-setup.html')
    var url = `https://uxplor.herokuapp.com/getlist?location=${latitude},${longitude}&radius=${radius}&type=${type}`;
    $.get(url, function(data) {
      data = JSON.parse(data);
      placesRay = data.results;
      console.log(placesRay);

      if(placesRay.length > 0) {
        let str = `${placesRay.length} locations found. Choose the number of locations for your hunt below:`;
        $('#play-btn').css('display', 'block');
        if(placesRay.length === 1) {
          str = `${placesRay.length} location found`;
        }
        $('#location-shower').text(str);
        $('#available-locations').fadeOut(10);
        $('#location-number').val(Math.min(placesRay.length, 10));
        $('.params-page').fadeOut(250);
        $('.game-setup').delay(250).fadeIn(250);
      } else {
        alert('Sorry, no locations match your parameters, please begin a new search.');
      }
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

$('#radius-label').hide();
$('#radius').val('1000ft radius');

$('#walk-btn').click(function() {
  $('#radius').val('1000ft');
  $('#radius-label').hide();
});

$('#bike-btn').click(function() {
  $('#radius').val('6000ft');
  $('#radius-label').hide();
});

$('#car-btn').click(function() {
  $('#radius').val('12000ft');
  $('#radius-label').hide();
});

$('#incrementer').click(function() {
  changeRadius(1);
});

$('#decrementer').click(function() {
  changeRadius(-1);
});

$('#play-btn').click(function() {
  let gameLocRay = createScavengeLocationArray();
  console.log(gameLocRay);
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

function createScavengeLocationArray() {
  let gameLocRay = [];

  return gameLocRay;
}


$('#play-btn').click(function() {
  let gameLocRay = createScavengeLocationArray(tempVal, maxVal);
});
