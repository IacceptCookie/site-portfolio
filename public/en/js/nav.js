var hamburger = document.getElementsByClassName("nav-hamburger")[0];
var navMobile = document.getElementsByClassName("nav-mobile")[0];

hamburger.addEventListener("click", function () {

if ((navMobile.style.maxHeight === "0px") || !(navMobile.getAttribute("style"))) {
    navMobile.style.maxHeight = navMobile.scrollHeight + "px";
} else {
    navMobile.style.maxHeight = "0px";
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
}
