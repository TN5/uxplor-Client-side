$(document).ready(function(){
  $('select').material_select();
  $.get('types.txt', function(data) {
    console.log(data);
    data = data.split('\n');
    data.forEach(function(i) {
      console.log(`<option class="option">${i}</option>`);
      $('select.select').append(`<option class="option">${i}</option>`)
    })
    $('select').material_select();
  })
})
