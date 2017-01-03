$(document).ready(function(){
  $('select').material_select();
  $.get('types.txt', function(data) {
    data = data.split('\n');
    data.forEach(function(i) {
      $('select.select').append(`<option class="option">${i}</option>`)
    })
    $('select').material_select();
  })
})
