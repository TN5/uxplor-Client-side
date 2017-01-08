$(document).ready( function() {
  $('.button-collapse').sideNav({
    menuWidth: 300,
    edge: 'left',
    closeOnClick: true,
    draggable: true
  });
  
  var id = 1;
  $.get('badges.txt', function(data) {
    let dataArray = data.split('\n')
    dataArray.pop()
    dataArray.forEach(function(i) {
       $('#badge-container').append(  `<div id="image-holder" class="image-holder col s2">
          <img class="image-size" id="badge-image" src="${i}">
         </div>`)
    })
  } )
  // var url = 'https://uxplor.herokuapp.com/badge/1'
  // $.get(url, function(data){
  //   data.forEach( function(badge) {
  //     console.log(badge);
      // $('#badge-container').append(  `<div id="image-holder" class="image-holder col s2">
      //     <img class="image-size" id="badge-image" src="pics/${badge.image_url}">
      //   </div>`)
      });
  // });
// });
