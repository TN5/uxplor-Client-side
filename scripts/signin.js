function userSignin() {

  $('#submit-signin').click(function(event) {
    event.preventDefault();
    var user = {
      email: $('#email').val(),
      password: $('#password').val()
    }
    $('#signin-form').each(function(){
      this.reset();
    });
    $.post('https://uxplor.herokuapp.com/auth/signin', user, function(){
      console.log(user);

      // window.location=`/index.html?id=${user.id}`
      var userEmail = $('#user-email').text(user.email);
      $('.button-collapse').sideNav('show');
      console.log(userEmail);
    })
    .catch(function(error){
      console.log(error);
    })
  })
}
