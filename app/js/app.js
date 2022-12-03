const body = document.querySelector("body");
const header = document.querySelector(".header");
const fadeItems = document.querySelectorAll(".has-fade");
const navToggler = document.querySelector(".header__toggle");

navToggler.addEventListener("click", function () {
    if (header.classList.contains("open")) { // Close Hamburger Menu 
        body.classList.remove("noscroll");
        header.classList.remove("open");
        fadeItems.forEach(function (element) {
            element.classList.remove("fade-in");
            element.classList.add("fade-out");
        });
    }
    else { // Open Hamburger Menu
        body.classList.add("noscroll");
        header.classList.add("open");
        fadeItems.forEach(function (element) {
            element.classList.remove("fade-out");
            element.classList.add("fade-in");
        });
    }
});