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
    $.post('https://uxplor.herokuapp.com/auth/signin', user)
    .then(function(result){
      console.log(result);
      // redirect
      var userName = $("#user-name").text();
      var userPassword = $('#password').text();

      console.log(userName, userPassword);

      $('.button-collapse').sideNav('show');
      userName = $('#email').val();
      userPassword = $('#password').val();
      // window.location=`/params.html`
    })
    .catch(function(error){
      console.log(error);
    })
  })
}
