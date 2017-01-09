$.ajaxSetup({
  crossDomain: true,
  xhrFields: {
    withCredentials: true
  }
})

var API_URL = getHostURL();
function getHostURL() {
  if(window.location.host.indexOf('localhost') != -1 || window.location.host.indexOf('127.0.0.1') != -1)  {
    return 'http://localhost:3000';
  } else {
    return 'https://uxplor.herokuapp.com'
  }
}
