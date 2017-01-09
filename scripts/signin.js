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
    $.post('http://localhost:3000/auth/signin', user, function(){
      console.log(user);
      // window.location=`/index.html?id=${user.id}`
      var userEmail = $('#user-email').text(user.email);
      $('.button-collapse').sideNav('show');
    }).catch(function(error){
      console.log(error);
    })

  })
}
