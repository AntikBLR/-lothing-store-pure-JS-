let itemBox = document.querySelectorAll('.product__box') // block of each item 
let cartCont = document.querySelector('.product__content') // cart data output block 
let cartData = ""

function addEvent(elem, type, handler) {
	if (elem !== null ) {
	if (elem.addEventListener) {
		elem.addEventListener(type, handler, false);
	} else {
		elem.attachEvent('on' + type, function () {
			handler.call(elem);
		});
	}
	return false;
	}
}
function basketSum() {
	let sumProduckt = 0;
	cartData = getCartData();
	if (cartData !== null) {
		for (let items in cartData) sumProduckt = sumProduckt + cartData[items][2]
		document.querySelector(".header__basket").innerHTML = sumProduckt;
		document.querySelector(".header__basket").style.display = "block";
	}
}
function getCartData() { // We get data from  LocalStorage
	return JSON.parse(localStorage.getItem('cart'));
}
function setCartData(data) { // We write data  LocalStorage
	localStorage.setItem('cart', JSON.stringify(data));
	return false;
}
function addToCart(e) { // Add a product to the cart 
	this.disabled = true; // we block the button for the duration of the operation with the basket 
	let cartData = getCartData() || {}, // get the cart data or create a new object if there is no data yet 
		parentBox = this.parentNode, // parent of the Add to Cart button 
		itemId = this.getAttribute('data-id'), // ID product 
		itemTitle = parentBox.querySelector('.product__title').innerHTML, // name product 
		itemPrice = parentBox.querySelector('.product_price').innerHTML // price product
	basketSum()
	alert("Товар успешно добавлен в корзину!")
	if (cartData.hasOwnProperty(itemId)) { // if such a product is already in the cart, then add +1 to its quantity 
		cartData[itemId][2] += 1
	} else { // if there is no item in the cart yet, then add it to the object 
		cartData[itemId] = [itemTitle, itemPrice, 1]
	}
	if (!setCartData(cartData)) { // Updating data in  LocalStorage
		this.disabled = false; // unlock the button after updating  LS
	}
	return false
}
// Install an event handler for each "Add to cart" button 
for (let i = 0; i < itemBox.length; i++) {
	addEvent(itemBox[i].querySelector('.add_item'), 'click', addToCart)
}
// Open the cart with a list of added products 
let basketCheck = document.querySelector(".basket__check")
let backetProduct = document.querySelector(".basket__product")
		
function openCart(e) {
let	totalItems = '',
		sumMoney = 0,
		sumProduckt = 0
	cartData = getCartData(); // we pull out all the data of the basket 
	// if there is already something in the basket, we start generating data for withdrawal 
	if (cartData !== null) {
		totalItems = '<table class="basket__table"><tr><th>Наименование продукции</th><th>Цена(за ед продукции)</th><th>Количество товара(ед)</th><th>Общая сумма($)</th></tr>';
		for (let items in cartData) {
			totalItems += '<tr>';
			let sum = cartData[items][1] * cartData[items][2];
			sumProduckt = sumProduckt + cartData[items][2]
			sumMoney = sumMoney + (cartData[items][1] * cartData[items][2])
			console.log(cartData[items][0])
			for (let i = 0; i < cartData[items].length; i++) {
				totalItems += '<td>' + cartData[items][i] + '</td>';
			}
			totalItems += '<td>' + sum + '</td>'
			totalItems += '</tr>';
		}
		totalItems += '</table>';
		cartCont.innerHTML = totalItems;
		backetProduct.innerHTML = 'Общение количество товара: ' + sumProduckt+"шт";
		basketCheck.innerHTML = 'Обшая сумма: ' + sumMoney+"$";
	} else {
		cartCont.innerHTML = 'В корзине пусто!';
	}
	return false;
}
/* open cart  */
addEvent(document.getElementById('checkout'), 'click', openCart);
/* clear cart  */
addEvent(document.getElementById('product__clear'), 'click', function (e) {
	document.querySelector(".header__basket").style.display = "none";
	backetProduct.innerHTML = 'Общение количество товара: ' + 0+"шт";
	basketCheck.innerHTML = 'Обшая сумма: ' + 0+"$";
	localStorage.removeItem('cart');
	cartCont.innerHTML = 'Корзина очишена.';
});
addEvent(document.querySelector('.backet__get'), 'click', function (e) {
	let backetPromo = document.querySelector(".backet__promo").value
	let sum = basketCheck.value
	if (backetPromo == 30) sum = (sum/100) * 70
	if (backetPromo == 20) sum = (sum/100) * 80
	if (backetPromo == 10) sum = (sum/100) * 90
	else {
		alert("Неверный код!")
	}
	document.querySelector('.basket__discount').innerHTML = `Общая сумма на товары(c учетом скидки): -${sum}$`;
});
basketSum()