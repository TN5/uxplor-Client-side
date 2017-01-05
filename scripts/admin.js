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

$('#flagged').click(function() {
  $.get('https://https://uxplor.herokuapp.com/flag', function(flagged) {
    var $list = $('#flags')
    $('#ratings').html('');
    $list.html('');
    for (var i = 0; i < flagged.length; i++) {
      var name = flagged[i].name;
      var googleId = flagged[i].google_id;
      var type = flagged[i].flag_type;
      var userId = flagged[i].user_id;
      $list.append(`
        <li class="collection-item">
          <span class="title">Name: ${name}</span>
          <p>Google ID: ${googleId} <br>
             Type: ${type} <br>
             User ID: ${userId}
          </p>
        </li>

        `)
    };
  });
});

$('#rating').click(function() {
  $.get('https://https://uxplor.herokuapp.com/feedback', function(rating) {
    var $ratings = $('#ratings')
    $('#flags').html('');
    $ratings.html('');
    for (var i = rating.length -1; i > -1; i--) {
      var id = rating[i].id;
      var rate = rating[i].rating;

      $ratings.append(`
        <li class="collection-item">
          <span class="title">Id: ${id}</span>
          <p>Rating: ${rate} <br>
          </p>
        </li>

        `)
    };
  });
});
