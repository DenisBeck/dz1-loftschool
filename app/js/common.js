window.onload = function() {

	var httpreq = new XMLHttpRequest();

	if(httpreq) {

		httpreq.open('POST', 'test.php', true);
		httpreq.onreadystatechange = function() {

			var timer = setInterval(console.log(httpreq.readyState), 10);
			if (httpreq.readyState === 4) {
				clearInterval(timer);

				if (httpreq.status == 200) {
					console.log(httpreq.responseText);
				} else {
					console.log('Облом');
				}
			}

		}
		httpreq.send();

	} else {
		console.log('httpreq не существует');
	}

}