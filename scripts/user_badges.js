$(document).ready( function() {
  var id = 1
  $.get(`https://uxplor.herokuapp.com/badge/${id}`, function(data) {
    console.log(data);
  })
}
