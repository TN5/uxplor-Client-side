$(document).ready(function() {
  var star
  $('.star').click(function() {
    star = $(this).attr('id');
    console.log(star);
    for (var i = 1; i <= 5; i++) {
      if (i <= star) {
        $(`#${i}`).removeClass("white-text");
        $(`#${i}`).addClass("lime-text");
      } else {
        $(`#${i}`).removeClass("lime-text");
        $(`#${i}`).addClass("white-text");
      }
    }
  });

  $('.submit').click(function() {
    $('.submit-div').css('display', 'none');
    $('.playbtn').css('margin', '0 auto');
    let ratingObject = {
      rating: star
    }
    console.log(ratingObject);
    // $.post
  });

});
