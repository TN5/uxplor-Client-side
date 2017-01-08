$(document).ready(function() {
  getHostURL();
  createNewUser();
  userSignin();
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
    // 'https://uxplor.herokuapp.com/auth/signup'
    $.post('http://localhost:3000/signup', user, function(user){
      // window.location='/params.html'
    })
    //fix redirect
    .catch(function(error){
      console.log(error);
    })
  })
}
