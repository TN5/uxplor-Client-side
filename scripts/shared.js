var API_URL = getHostURL();

function getHostURL() {
  console.log(window.location.host);
  if(window.location.host.indexOf('localhost') != -1) {
    return 'https://localhost:3000';
  } else {
    return 'https://uxplor-7ce2a.firebaseapp.com/'
  }
}
