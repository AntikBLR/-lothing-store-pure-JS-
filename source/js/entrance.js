let email = document.getElementById("email");
let pass = document.getElementById("pass");
let repass = document.getElementById("repass");


function checkLength() { // Разблокировка кнопки отправки
	if (emailUser.value.length > 5) {
		document.querySelector(".entrance__button").removeAttribute('disabled')
		document.querySelector(".entrance__button").style.opacity = "1"
	}
}
let emailUser = document.getElementById("email");
emailUser.addEventListener('keyup', checkLength)

function passwordReset() { // Отключение функции требующие заполнение полей при сбросе Email и Регистрации
	email.removeAttribute('required')
	pass.removeAttribute('required')
	repass.removeAttribute('required')
}

let passResetUser = document.getElementById("reset2");
passResetUser.addEventListener('click', passwordReset)

function resetField() { // Сброс полей вовда 
	email.value = ""
	pass.value = ""
	repass.value = ""
} 

// Отправка и проверка данных 
document.querySelector(".entrance__button").addEventListener("click", () => {
	let test = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i // Проверка наличия символов в Email
	let valid = test.test(email.value) // Проверка наличия символов в Email

	document.querySelectorAll(".entrance__activ").forEach(el => { // Какая область активна(Регистрация/ Вход / Сброс);
		if (el.checked && el.id == "signin") { // Поле Авторазиции 
			if (valid == false) alert("Email введен некоректно. Используйте символы - (@.)")
			else if (pass.value.length < 6) alert("Пароль введен некоректно. Длинна пароля должна быть больше 6 символов")
			else entranceSingin()
		} 
		if (el.checked && el.id == "signup") { // Поле Регистрации
			if (valid == false) alert("Email введен некоректно. Используйте символы - (@.)")
			else if (pass.value.length < 6) alert("Пароль введен некоректно. Длинна пароля должна быть больше 6 символов")
			else if (pass.value !== repass.value) alert("Пароль и повторный пароль несовпадают, проверьте правильность написание пароля")
			else if (valid == true && pass.value.length > 6) entranceSignup()
		} 
		if (el.checked && el.id == "reset") {  // Поле сброса пароля
			if (valid == false) alert("Email введен некоректно. Используйте символы - (@.)")
			else entranceReset()
		} 
	});

	function entranceSingin() { // Авторизация
		let localLogin = localStorage.getItem(email.value)
		if (localLogin !== null) {
			let localPass = JSON.parse(localLogin)
			if (pass.value == localPass) {
//				document.querySelector(".entrance__authorization").style.display = "flex" Бьет ошибку
				window.location.href = "../index.html"
			} else alert("Пароль введен неправильно")
		} else alert("Email-адрес введен неправильно или несуществует")
		resetField()
	}

	function entranceSignup() { // Регистрация 
		let localLogin = localStorage.getItem(email.value)
		if (localLogin !== null) {
			alert("Email-адрес уже существует")
		} else {
			localStorage.setItem(email.value,JSON.stringify(pass.value))
			setCookie( email.value, pass.value, {
				secure: true,
				'max-age': 3600
			});
			resetField()
			passwordReset();
			document.querySelector(".entrance__registration").style.display = "flex"
		}
	}

	function entranceReset() { // Сброс
		let localLogin = localStorage.getItem(email.value)
		if (localLogin !== null) alert("Вам выслали новый пароль на вашу почту")
		else alert("Email-адреса не существует")
	}
});

// Закрытие модального окна
document.querySelector(".registration__button").addEventListener("click", () => {
	document.querySelector(".entrance__registration").style.display = "none";
});

