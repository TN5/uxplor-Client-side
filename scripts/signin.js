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
      // redirect
      // var userName = $("#user-name").text();
      var userEmail = $('#user-email').text();
      $('.button-collapse').sideNav('show');
      // window.location=`/params.html`
      userEmail = user.email;
      console.log(userEmail);

    })
    .catch(function(error){
      console.log(error);
    })
  })
}
