var cookieAccept = document.getElementsByClassName("cookie-consent-accept")[0];
var cookieRefuse = document.getElementsByClassName("cookie-consent-refuse")[0];
var cookieConsent = document.getElementsByClassName("cookie-consent")[0];

function setCookie(cname, cvalue, exdays = null) {
  let expires = "";
  if (!(exdays === null)) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      expires = "; expires="+ d.toUTCString();
  }
  document.cookie = cname + "=" + cvalue + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function delCookie(cname) {
  let cookie = getCookie(cname);
  document.cookie = cookie + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

var userConsent = getCookie("consent");

if (userConsent === "") {
    cookieConsent.style.display = "flex";
}

cookieAccept.addEventListener("click", function () {
    
    cookieConsent.style.display = "none";
    setCookie("consent", "accept", 360);

});

cookieRefuse.addEventListener("click", function () {
    
    cookieConsent.style.display = "none";
    setCookie("consent", "refuse");
    delCookie("language")
});

var userLang = navigator.language || navigator.userLanguage;