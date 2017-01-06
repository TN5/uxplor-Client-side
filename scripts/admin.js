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
  $.get('https://uxplor.herokuapp.com/flag', function(flagged) {
    var $list = $('#flags')
    $('#ratings').html('');
    $list.html('');
    for (var i = 0; i < flagged.length; i++) {
      if (flagged[i].flagged === true) {
        var name = flagged[i].name;
        var googleId = flagged[i].google_id;
        var type = flagged[i].flag_type;
        var userId = flagged[i].user_id;
        $list.append(`
          <li class="collection-item">
            <span class="title">Name: ${name}</span>
            <p>Google ID: <span class="googleid">${googleId}<span> <br>
               Type: <span class="type">${type}<span> <br>
               Flag ID: <span class="flagid">${flagged[i].id}<span><br>
               User ID: <span class="userid">${userId}<span>
            </p>
            <a id="unflag${flagged[i].id}" class="waves-effect waves-light btn">Unflag</a>
          </li>

          `);
        var obj = {
          name: name,
          google_id: googleId,
          flagged: false,
          flag_type: type,
          user_id: userId
        }
        var flags = flagged[i].id
        $($('#unflag' + flagged[i].id)[0]).click(function() {
          $.ajax({
            url: `https://uxplor.heroku.com/flag/${flags}`,
            method: 'PUT',
            data: obj,
            success: function(response) {
              window.location.reload();
            }
          });
        });
      }
    };
  });
});

$('#rating').click(function() {
  $.get('https://uxplor.herokuapp.com/feedback', function(rating) {
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
