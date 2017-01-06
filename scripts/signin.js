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
    $.post('http://localhost:3000/auth/signin', user)
    .then(function(result){
      console.log(result);
      // redirect
      window.location=`/params`
    }).catch(function(error){
      console.log(error);
    })
  })
}
