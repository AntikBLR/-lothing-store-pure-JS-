function initMap() {
	let uluru = {
		lat: 53.9044278,
		lng: 27.609361
	};
	let map = new google.maps.Map(document.querySelector(".header__maping"), {
		zoom: 12,
		center: uluru,
	});
	let image ="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
	let marker = new google.maps.Marker({
		position: uluru,
		map: map,
		title: "Время работы магазина с 9.00-23.00",
		icon: image,
		// animation: google.maps.Animation.BOUNCE,
	});
	marker.addListener('click', function() {
		infowindow.open(map, marker);
   });
	marker2 = new google.maps.Marker({
		position: {
			lat: 53.899233,
			lng: 27.574467
		},
		map: map,
		title: "Время работы магазина с 9.00-16.00",
		icon: image,
	});
	marker2.addListener('click', function() {
		infowindow.open(map, marker2);
   });
	marker3 = new google.maps.Marker({
		position: {
			lat: 53.876143,
			lng: 27.636734
		},
		map: map,
		title: "Время работы магазина с 9.00-16.00",
		icon: image,
	});
	marker3.addListener('click', function() {
		infowindow.open(map, marker3);
   });
	marker4 = new google.maps.Marker({
		position: {
			lat: 53.863394,
			lng: 27.582494
		},
		map: map,
		title: "Время работы магазина с 9.00-16.00",
		icon: image,
	});
	marker4.addListener('click', function() {
		infowindow.open(map, marker4);
   });
	marker5 = new google.maps.Marker({
		position: {
			lat: 53.890964,
			lng: 27.505835
		},
		map: map,
		title: "Время работы магазина с 9.00-16.00",
		icon: image,
	});
	marker5.addListener('click', function() {
		infowindow.open(map, marker5);
   });
	infowindow = new google.maps.InfoWindow({
		content: "г. Минска <br> Во всех крупных ТРЦ <br> Магазин одежды Bordo"
   });
}
