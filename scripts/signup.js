// var SIGNUP_URL = `${API_URL}signup/`;
console.log(API_URL);
$(document).ready(function() {
  getHostURL();
  createNewUser();
  // console.log(API_URL);
  // console.log(SIGNUP_URL);
})

function createNewUser() {
  $('#submit-signup').submit(function(event) {
    event.preventDefault();
    var user = {
      name: $('#new_first_name').val() + ' ' + $('#new_last_name').val(),
      email: $('#new-email').val(),
      password: $('#new-password').val()
    }
    $('#signup-form').each(function(){
      this.reset();
    });
    // console.log(`${SIGNUP_URL}signup`);
    // $.post(`${SIGNUP_URL}signup`, function(data) {
      // console.log(data);
    // })
  })
}
