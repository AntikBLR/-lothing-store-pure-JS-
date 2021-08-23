const url = 'https://gist.githubusercontent.com/oDASCo/3f4014d24dc79e1e29b58bfa96afaa1b/raw/677516ee3bd278f7e3d805108596ca431d00b629/db.json'

let data = []
let investorTable = document.querySelector('.investor__table')
let investorMan = document.querySelector('.investor__man')
let investorWoman = document.querySelector('.investor__woman')
let investorAge = document.querySelector('.investor__age')
let investorCheck = document.querySelector('.investor__check')
let investorButton = document.querySelector('#investor__button')

function countGender() { // Сounting the number of women and men investors 
	let male = 0
	let female = 0
	data.forEach(el => el.gender == 'male' ? male++ : female++)
	investorMan.innerHTML = 'Количество мужчин: ' + male;
	investorWoman.innerHTML =	'Количество женщин: ' + female;
}
function countMoney() { // calculation of investor contributions ($)
	let money = Object.keys(data).reduce((acc, curr) =>
	acc.balance ? (data[curr].balance > acc.balance ? data[curr] : acc) : data[curr], 0);
	investorCheck.innerHTML = 'Наибольший взнос: ' + money.balance;
}
function countAge() { // calculating the age of investors 
	let age = 0
	data.forEach(el =>  +el.age > +age ? age = +el.age : age)
	investorAge.innerHTML = 'Наибольший возраст: ' + +age;
}
function recalculationСall() { // recalculation of table data after deletion 
	countGender() // Сounting the number of women and men investors 
	countAge() // Сalculating the age of investors
	countMoney() // Сalculation of investor contributions ($)
}
function investorDelete () {
	document.querySelectorAll("tr").forEach((elem,indx) => { 
		elem.addEventListener('click', function () { /// 
			if (confirm("Вы хотите удалить элемент со страницы?")) { // delete request 
				let a = this.closest('tr');
				a.parentElement.removeChild(a);
				data.forEach((e,i) => {
					if(indx-1 == i) data.splice(i,1)
				})
				recalculationСall() // recalculation of table data after deletion 
			}
		})
	})
}

fetch(url) // data retrieval 
	.then(res => res.json())
	.then(res => {
		data = res
		function convertDate(inputFormat) { // changing the time format 
			var d = new Date(inputFormat)
			return d.toLocaleDateString()
		}
		function createTable() {  // forming a table from fetch data 
			data.forEach(el => {
				let tableCreate = document.createElement('tr')  // table creation 
				tableCreate.innerHTML = `<td>${el.name}
											<td>${el.company}
											<td>${el.email}
											<td>${el.phone}
											<td> ${el.balance}
											<td>${convertDate(Date(el.registered))}
											<td> ${el.gender} 
											<td> ${el.age}` 
				investorTable.appendChild(tableCreate)
				// designation of inactive investors 
				if (el.isActive == false) tableCreate.style.backgroundColor = "#D8E6F3"
			})
			recalculationСall() // recalculation of table data after deletion 
			investorDelete() // Work with a table (delete) 
		}
		createTable() // forming a table from fetch data 
	})



	
//investorButton.addEventListener("click", function ()  { //кнопка прокрутки
	//window.scrollTo(0,0) 
	// window.scrollTo({
	// 	top: 10,
	// 	behavior: 'smooth', //плавность
	// });
// });
