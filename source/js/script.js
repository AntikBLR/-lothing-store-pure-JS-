authorization()

// Header Burger 
let menuX = document.querySelector(".header__x");
let headerBurgerLink = document.querySelector(".header__burger__link");
document.querySelector(".header__burger").addEventListener("mousedown", function () {
	menuX.style.left = 0 + "%";
	headerBurgerLink.style.left = 0 + "%";
});
document.querySelector(".header__x").addEventListener("mousedown", function () {
	menuX.style.left = -100 + "%";
	headerBurgerLink.style.left = -100 + "%";
});