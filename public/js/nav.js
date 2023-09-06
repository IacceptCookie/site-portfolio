var hamburger = document.getElementsByClassName("nav-hamburger")[0];


hamburger.addEventListener("click", function () {

var navMobile = document.getElementsByClassName("nav-mobile")[0];

if ((navMobile.style.maxHeight === "0px") || !(navMobile.getAttribute("style"))) {
    navMobile.style.maxHeight = navMobile.scrollHeight + "px";
} else {
    navMobile.style.maxHeight = "0px";
}
});
