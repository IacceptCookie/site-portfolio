var hamburger = document.getElementsByClassName("nav-hamburger")[0];
var navMobile = document.getElementsByClassName("nav-mobile")[0];

hamburger.addEventListener("click", function () {

if ((navMobile.style.maxHeight === "0px") || !(navMobile.getAttribute("style"))) {
    navMobile.style.maxHeight = navMobile.scrollHeight + "px";
} else {
    navMobile.style.maxHeight = "0px";
}
});

var selectLang = document.getElementsByClassName("select-language");

var langList = document.getElementsByClassName("language-list");

selectLang[0].addEventListener("click", function () {

if ((langList[0].style.display === "none") || !(langList[0].getAttribute("style"))) {
langList[0].style.display = "flex";
} else {
langList[0].style.display = "none";
}
});

selectLang[1].addEventListener("click", function () {

    if ((langList[1].style.display === "none") || !(langList[1].getAttribute("style"))) {
    langList[1].style.display = "flex";
    } else {
    langList[1].style.display = "none";
    }
});

window.onscroll = function() {myFunction()};
            
var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

function myFunction() {
  if (window.scrollY > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
  navMobile.style.maxHeight = "0px";
  langList[1].style.display = "none";
}