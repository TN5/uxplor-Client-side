$(document).ready( function() {
  var id = 1;
  var url = 'https://uxplor.herokuapp.com/badge/1'
  $.get(url, function(data){
    data.forEach( function(badge) {
      console.log(badge);
      $('#badge-container').append(  `<div id="image-holder" class="image-holder col s2">
          <img class="image-size" id="badge-image" src="pics/${badge.image_url}">
        </div>`)
      });
  });
});
