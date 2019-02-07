'use strict';

// Szablon

var mainCarousel = document.querySelector('.main-carousel');
var templateSlide = document.getElementById('template-slide').innerHTML;
var slides = '';

Mustache.parse(templateSlide);

for (var i = 0; i < slidesData.length; i++) {
	slides += Mustache.render(templateSlide, slidesData[i])
};

mainCarousel.innerHTML = slides;

// Zainicjowanie karuzeli

var flkty = new Flickity('.main-carousel', {
	wrapAround: true,
	pageDots: false, // Ten sam efekt można uzyskać w pliku stylów dla kropek 'display: none;'
	hash: true,
	cellAlign: 'left',
	contain: true
});

// Przycisk 'restart'

document.getElementById('restart').addEventListener('click', function () {
	flkty.next();
	flkty.select(0);
});

// 'scroll'

var progressBar = document.querySelector('.progress-bar')

flkty.on('scroll', function (progress) {
	progress = Math.max(0, Math.min(1, progress));
	progressBar.style.width = progress * 100 + '%';
});

// Mapa

window.initMap = function () {

	var slidesCoords = slidesData.map(function (x) {
		return x.coords;
	})

	/* Początkowe wypośrodkowanie mapy ustawione na pierwszym slajdzie */

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 5,
		center: slidesCoords[0]
	});

	/* Pętla, która dodaje po jednym markerze dla każdego slajdu i wiąże kliknięcie w marker ze zmianą na odpowiadający mu slajd */

	slidesCoords.forEach(function (x, item) {
		var marker = new google.maps.Marker({
			position: x,
			map: map
		})

		marker.addListener('click', function () {
			flkty.select(item);
		})

		flkty.on('change', function () {
			map.panTo(item);
			map.setZoom(1);
		})

		flkty.on('change', function (item) {
			if (slidesCoords[item] == slidesCoords[0]) {
				map.panTo(slidesCoords[item]);
				map.setZoom(5);
			} else {
				map.panTo(slidesCoords[item]);
				map.setZoom(7);
			}
		})

	});
}