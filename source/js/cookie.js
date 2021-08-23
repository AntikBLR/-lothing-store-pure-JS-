function setCookie(name, value, options = {}) { // Запись в куки
	options = options || {};
	let expires = options.expires;

	if (typeof expires == "number" && expires) {
		let d = new Date();
		d.setTime(d.getTime() + expires * 1000);
		expires = options.expires = d;
	}
	if (expires && expires.toUTCString) options.expires = expires.toUTCString();
	value = encodeURIComponent(value);

	let updatedCookie = name + "=" + value;

	for (let propName in options) {
		updatedCookie += "; " + propName;
		let propValue = options[propName];
		if (propValue !== true) updatedCookie += "=" + propValue;
	}
	document.cookie = updatedCookie;
}

function getCookie(cookie) { // Проверка есть ли такой куки
	let name = cookie + "=";
	let cookieAll = document.cookie.split(';');
	for (let i = 0; i < cookieAll.length; i++) {
		let c = cookieAll[i].trim();
		if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "";
}

function authorization() { // Проверка есть ли в Cookie и localStorage одинаковые пользователи.
	let cookieAll = document.cookie.split(" ")
	let examination = "";
	for (let i = 0; i < localStorage.length; i++) {
		let key = localStorage.key(i);
		let abc = localStorage.getItem(key).replace(/['"]+/g, '');
		cookieAll.forEach(el => {
			if (`${key}=${abc}` == el) {
				console.log(true);
				examination = true;
			}
		});
	}
	// Проверка на какой странице нахожусь (Чтобы постоянно не перезагружалась страница)
	//if (examination !== true && document.URL !== "http://localhost:3000/entrance.html")  window.location.href = "../entrance.html"	
}
// authorization()


// if (localStorage.getItem('key') !== null) {}  Проверка есть ли в localStorag такой эмеал

// Slider Header 
let headerSlider = document.querySelector(".header__logo");

document.querySelector(".circle1").addEventListener("click", () => {
	headerSlider.style.backgroundImage = "url('../img/Rectangle\ 2.png')"
})

document.querySelector(".circle2").addEventListener("click", () => {
	headerSlider.style.backgroundImage = "url('../img/logo1.jpg')"
})

document.querySelector(".circle3").addEventListener("click", () => {
	headerSlider.style.backgroundImage = "url('../img/logo2.jpg')"
})
document.querySelector(".circle4").addEventListener("click", () => {
	headerSlider.style.backgroundImage = "url('../img/logo3.jpg')"
})

document.querySelector(".circle5").addEventListener("click", () => {
	headerSlider.style.backgroundImage = "url('../img/logo4.jpg')"
})

// let circle = document.querySelectorAll('.header__circle'); // При нажатии активна
// document.querySelector('.header__circle').addEventListener('click',function(){
// 	circle.forEach(elem => { 
// 		elem.addEventListener('click', function () { 
// 				this.style.backgroundColor = "black";
// 		})
// 	})
// });


// Section scrolling 

let offset = 0;
let sectionBlock = document.querySelector(".section__block")
let sectionBlock2 = document.querySelector(".section__block2")
let sectionBlock3 = document.querySelector(".section__block3")
let sectionBlock4 = document.querySelector(".section__block4")
let sectionBlock5 = document.querySelector(".section__block5")

document.querySelector(".left").addEventListener("mousedown",function() {
	offset = offset + 60;
	sectionBlock.style.left = offset + "px";
	if (offset > 1) offset = 0;

});
document.querySelector(".right").addEventListener("mousedown",function () {
	offset = offset - 60;
	sectionBlock.style.left = offset + "px";
	if (offset < -730) offset = -730;
});

document.querySelector(".left2").addEventListener("mousedown",function () {
	offset = offset + 60;
	sectionBlock2.style.left = offset + "px";
	if (offset > 1) offset = 0;

});
document.querySelector(".right2").addEventListener("mousedown",function () {
	offset = offset - 60;
	sectionBlock2.style.left = offset + "px";
	if (offset < -730) offset = -730;
});
document.querySelector(".left3").addEventListener("mousedown",function () {
	offset = offset + 60;
	sectionBlock3.style.left = offset + "px";
	if (offset > 1) offset = 0;

});
document.querySelector(".right3").addEventListener("mousedown",function () {
	offset = offset - 60;
	sectionBlock3.style.left = offset + "px";
	if (offset < -730) offset = -730;
});
document.querySelector(".left4").addEventListener("mousedown",function () {
	offset = offset + 60;
	sectionBlock4.style.left = offset + "px";
	if (offset > 1) offset = 0;

});
document.querySelector(".right4").addEventListener("mousedown",function () {
	offset = offset - 60;
	sectionBlock4.style.left = offset + "px";
	if (offset < -730) offset = -730;
});
document.querySelector(".left5").addEventListener("mousedown",function () {
	offset = offset + 60;
	sectionBlock5.style.left = offset + "px";
	if (offset > 1) offset = 0;

});
document.querySelector(".right5").addEventListener("mousedown",function () {
	offset = offset - 60;
	sectionBlock5.style.left = offset + "px";
	if (offset < -730) offset = -730;
});
