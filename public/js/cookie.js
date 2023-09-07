/* Cookie consent banner variables */
var cookieAccept = document.getElementsByClassName("cookie-consent-accept")[0];
var cookieRefuse = document.getElementsByClassName("cookie-consent-refuse")[0];
var cookieConsent = document.getElementsByClassName("cookie-consent")[0];

/* Cookie getter, setter and deleter functions */

  /* set a cookie. cname is the name of the cookie, cvalue is his value and exdays is the number of days before expiration date */
function setCookie(cname, cvalue, exdays = null) {
  let expires = "";
  if (!(exdays === null)) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      expires = "; expires="+ d.toUTCString();
  }
  document.cookie = cname + "=" + cvalue + expires + ";path=/";
}

  /* get a cookie by his name and return his value. return "" if not found */
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

  /* delete a cookie by replacing his expiration date by a past date */
function delCookie(cname) {
  let cookie = getCookie(cname);
  document.cookie = cookie + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

/* Check if user has already answered the consent request */

var userConsent = getCookie("consent");

if (userConsent === "") {
    cookieConsent.style.display = "flex";
}

/* here we handle the consent request */

cookieAccept.addEventListener("click", function () {
    
    cookieConsent.style.display = "none";
    setCookie("consent", "accept", 360);

});

cookieRefuse.addEventListener("click", function () {
    
    cookieConsent.style.display = "none";
    setCookie("consent", "refuse");
    delCookie("language")
});

/* we handle the language of the website based on the user "language" cookie */ 

  /* check user language, if not found, pick the navigator default language */
var userLang = getCookie("language");

if (userLang === "") {
  var userLang = navigator.language || navigator.userLanguage;
  var userLang = userLang.slice(0,2);
}

  /* redirect the user if he hasn't the good language, except if he just changed the language */
var params = new URLSearchParams(location.search);

if (!params.get('redirected')) {
  if (userLang === "en") {
    if (document.documentElement.lang === "fr") {
      window.location.href = "en" + window.location.pathname + "?redirected=true";
      window.location.href = "en" + "/index.html" + "?redirected=true";
    }
  } else if (userLang === "fr") {
    if (document.documentElement.lang === "en") {
      window.location.href = "../" + window.location.pathname + "?redirected=true";
      window.location.href = ".." + "/index.html" + "?redirected=true";
    }
  } else if (!document.documentElement.lang === "en") {
    window.location.href = "en" + window.location.pathname + "?redirected=true";
    window.location.href = "en" + "/index.html" + "?redirected=true";
}
}

/* if the user change the language, he is redirected and get a cookie if he accept them */
var enList = document.getElementsByClassName("language en");
var frList = document.getElementsByClassName("language fr");

if (enList.length == 2) {
  enList[0].addEventListener("click", function () {

    userConsent = getCookie("consent");
    if (userConsent === "accept") {
      setCookie("language", "en", 360);
    }
    if (document.documentElement.lang === "fr") {
      window.location.href = "en" + window.location.pathname + "?redirected=true";
      window.location.href = "en" + "/index.html" + "?redirected=true";
    }
  });

  enList[1].addEventListener("click", function () {

    userConsent = getCookie("consent");
    if (userConsent === "accept") {
      setCookie("language", "en", 360);
    }
    if (document.documentElement.lang === "fr") {
      window.location.href = "en" + window.location.pathname + "?redirected=true";
      window.location.href = "en" + "/index.html" + "?redirected=true";
    }
  });
}

if (frList.length == 2) {
  frList[0].addEventListener("click", function () {

    userConsent = getCookie("consent");
    if (userConsent === "accept") {
      setCookie("language", "fr", 360);
    }
    if (document.documentElement.lang === "en") {
      window.location.href = ".." + window.location.pathname + "?redirected=true";
      window.location.href = ".." + "/index.html" + "?redirected=true";
    }
  });

  frList[1].addEventListener("click", function () {

    userConsent = getCookie("consent");
    if (userConsent === "accept") {
      setCookie("language", "fr", 360);
    }
    if (document.documentElement.lang === "en") {
      window.location.href = ".." + window.location.pathname + "?redirected=true";
      window.location.href = ".." + "/index.html" + "?redirected=true";
    }
  });
}
