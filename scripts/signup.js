$(document).ready(function() {
  getHostURL();
  createNewUser();
})

function createNewUser() {
  $('#submit-signup').click(function(event) {
    event.preventDefault();
    var user = {
      name: $('#new_first_name').val() + ' ' + $('#new_last_name').val(),
      email: $('#new-email').val(),
      password: $('#new-password').val()
    }
    $('#signup-form').each(function(){
      this.reset();
    });

    $.post('http://localhost:3000/auth/signup', user, function(user){
      console.log(user);
    }).catch(function(error){
      console.log(error);
    })
  })
}

function userSignin() {
  $('#submit-signin').click(function(event) {
    event.preventDefault();
    console.log('signin');
    var user = {
      email: $('#new-email').val(),
      password: $('#new-password').val()
    }
    // $('#signin-form').each(function(){
    //   this.reset();
    // });

    // $.post('http://localhost:3000/auth/signin', user, function(user){
    //   console.log(user);
    // }).catch(function(error){
    //   console.log(error);
    // })
  })
}
