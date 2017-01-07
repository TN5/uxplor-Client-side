$(document).ready(function(){
  $('select').material_select();
  $('.modal').modal();
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

var badgeRay = [];
var locationObj = {};
var longitude;
var latitude;
var placesRay = [];
let gameLocRay = [];
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

$.get('badges.txt', function(data) {
  badgeRay = data.split('\n');
});

function success(pos) {
  var crd = pos.coords;
  latitude = crd.latitude;
  longitude = crd.longitude;
  $('#param-submit').removeClass('disabled');
  if (locationObj != {}) {
    distanceToLocation(locationObj.lat, locationObj.long)
  }

};

$('#param-submit').click(function() {
  var radius = parseInt($('#radius').val()) * .3048;
  var type = $('input.select-dropdown').val();
  if (type != 'Pick location type' && !isNaN(radius)){
    var url = `https://uxplor.herokuapp.com/getlist?location=${latitude},${longitude}&radius=${radius}&type=${type}`;
    $.get(url, function(data) {
      data = JSON.parse(data);
      placesRay = data.results;

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

function changeRadius(coef) {
  var change = 100;
  var radius = parseInt($('#radius').val());
  if(radius >= 6000) {
    change = 1000;
  } else if(radius >= 2000) {
    change = 200;
  }
  radius += (change * coef);
  $('#radius').val(`${radius} ft`);
}

$('#incrementer2').click(function() {
  changePlaceCount(1);
});

$('#decrementer2').click(function() {
  changePlaceCount(-1);
});

function changePlaceCount(inc) {
  var placeCount = parseInt($('#location-number').val()) + inc;
  if (placeCount < placesRay.length + 1 && placeCount >= 1) {
    $('#location-number').val(placeCount);
  }
}

function createScavengeLocationArray() {
  let newLen = $('#location-number').val();
  let oldLen = placesRay.length;
  let ray = [];
  for(var i = 0; i < newLen; i++) {
    let tempObj = {};
    var index = Math.floor(Math.random() * placesRay.length);
    ray.push(makePlaceObj(placesRay[index]));
    placesRay.splice(index, 1);
  }
  return ray;
}

function makePlaceObj(item) {
    let tempObj = {};
    tempObj.name = item.name;
    tempObj.id = item.place_id;
    tempObj.address = item.vicinity;
    tempObj.lat = item.geometry.location.lat;
    tempObj.long = item.geometry.location.lng;
    return tempObj;
}

$('#play-btn').click(function() {
  gameLocRay = createScavengeLocationArray();
  $('.game-setup').fadeOut(250);
  $('.game-play').delay(250).fadeIn(250);
  displayLocationInfo(gameLocRay);
});

function displayLocationInfo(ray) {
  if(ray.length > 0) {
    locationObj = ray.pop();
    $('#location-name').text(locationObj.name);
    $('#location-address').text(locationObj.address);
    distanceToLocation(locationObj.lat, locationObj.long);
  } else {
    window.location = 'win.html';
  }
}

function distanceToLocation(lat, long) {
  let deltaLat = lat - latitude;
  let deltaLong = long - longitude;
  let distLat = deltaLat * 365221.43;
  let distLong = deltaLong * (365221.43 * Math.sin((90 - lat) * .0174533));
  let distance = Math.sqrt((distLat * distLat) + (distLong * distLong));
  hotness(distance);
  directionPointer(distLat, distLong);
  $('#distance-to').text(`${Math.ceil(distance)} ft to ${locationObj.name}`);
}

$('#flag-submit, #badge').click(function() {
  if (gameLocRay.length = 1) {
    $('#countdown-text').text(`You have 1 location to go.`);
  } else if (gameLocRay.length = 0) {
    $('#countdown-text').text(`This is your last location.`);
  } else {
    $('#countdown-text').text(`You have ${gameLocRay.length} locations to go.`);
  }
  if($('.flag-reason[name=flag-reason]:checked').val() != undefined){
    displayLocationInfo(gameLocRay);
    console.log(locationObj);
    let flagObj = {
      flag_type : $('.flag-reason[name=flag-reason]:checked').val(),
      google_id: locationObj.id,
      user_id: 1,
      name: locationObj.name,
      flagged: true
    }
    console.log($('.flag-reason[name=flag-reason]:checked').val());
    // $.post('https://uxplor.herokuapp.com/flag', flagObj, function(data) {
    //   console.log(data);
    // });
  } else {
    alert("You must select a value or press cancel.")
  }
  $('.flag-reason').prop('checked', false)
});

function hotness(hot) {
  $('.blue-bar, .red-bar, .orange-bar, .yellow-bar').css('background-color', '#90d9e1');
  if (hot <= 150) {
    $('.red-bar').css('background-color', '#c30000');
  }
  if (hot <= 300) {
    $('.orange-bar').css('background-color', '#e27f00');
  }
  if (hot <= 450) {
    $('.yellow-bar').css('background-color', '#FFF359');
  }

  $('#hotness-text').text(`You're Cold!`).css('color', 'white');
  if (hot <= 150) {
    $('#hotness-text').text(`You're on Fire!`).css('color', '#c30000');
  } else if (hot <= 300) {
    $('#hotness-text').text(`You're Gettin Hot!`).css('color', '#e27f00');;
  } else if (hot <= 450) {
    $('#hotness-text').text(`You're Warming Up!`).css('color', '#FFF359');;
  }

  if (hot < 50) {
    let index = Math.floor(Math.random() * badgeRay.length);
    $('.badge-container').empty();
    $('.badge-container').append(`<img src="${badgeRay[index]}"/>`);
    $('#modal2-trigger').click();
  }
}

function directionPointer(y, x) {
  let angle = Math.round((Math.atan(y/x) * 57.2958));
  if(x < 0) {
    angle += 180;
  }
  rotateArrow(-angle);
}

function rotateArrow(angle) {
  $('#arrow-direction').css('transform', `rotate(${angle}deg`);
}
