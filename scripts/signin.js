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
    // https://uxplor.herokuapp.com/auth/signin
    $.post('http://localhost:3000/auth/signin/', user, function(){
      console.log(user);
      // window.location=`/index.html?id=${user.id}`
      var userEmail = $('#user-email').text(user.email);
      // var userName =  $('#user-name').text(user.name);
      $('.button-collapse').sideNav('show');

    })
    .catch(function(error){
      console.log(error);
    })
    .then(function(){
      getUserInfo()
    })
  })
}
// `https://uxplor.herokuapp.com/auth/signin?id=${user.id}`
function getUserInfo() {
  return $.get('http://localhost:3000/auth/signin/',function(data) {
    console.log("signed in:" + data );
  })
}
