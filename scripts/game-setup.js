
$(document).ready( function() {
  $('.button-collapse').sideNav({
    menuWidth: 300,
    edge: 'left',
    closeOnClick: true,
    draggable: true
  }
);
  $('.parallax').parallax();
});

var placesRay = sessionStorage.getItem('placesRay');
console.log(placesRay);
