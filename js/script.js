'use strict';

// Szablon

var mainCarousel = document.querySelector('.main-carousel');
var templateSlide = document.getElementById('template-slide').innerHTML;
var slides = '';

Mustache.parse(templateSlide);

for(var i = 0; i < slidesData.length; i++){
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

document.getElementById('restart').addEventListener('click', function() {
    flkty.next();
    flkty.select(0);
});

// 'scroll'

var progressBar = document.querySelector('.progress-bar')

flkty.on('scroll', function(progress) {
  progress = Math.max( 0, Math.min( 1, progress ));
  progressBar.style.width = progress * 100 + '%';
});

// Mapa

window.initMap = function() {
	
	var slidesCoords = slidesData.map(function(x){
		return x.coords;
	})

	/* Początkowe wypośrodkowanie mapy ustawione na pierwszym slajdzie */
	
	var map = new google.maps.Map(document.getElementById('map'),{
		zoom: 5,
		center: slidesCoords[0]
	});

	/* Pętla, która dodaje po jednym markerze dla każdego slajdu i wiąże kliknięcie w marker ze zmianą na odpowiadający mu slajd */
	
	slidesCoords.forEach(function(x, item){
		var marker = new google.maps.Marker({
			position: x,
			map: map
		})

		marker.addListener('click', function(){
			flkty.select(item)
		})
	});

	/* Ten fragment kodu odpowiada za zmianę wycentrowania mapy po zmianie slajdu; dla slajdu pierwszego jest ustawiony inny zoom niż
	dla pozostałych slajdów */
	
	flkty.on('change', function(item){
		if(slidesCoords[item] == slidesCoords[0]){
			map.panTo(slidesCoords[item]);
			map.setZoom(5);
		}

		else{
			map.panTo(slidesCoords[item]);
			map.setZoom(7);
		}
	})

	/* Alternatywny kod dla zmiany wycentrowania mapy po zmianie slajdu, z wykorzystaniem funkcji smoothPanAndZoom; funkcja została w całości
	skopiowana z ćwiczeń w module 10.3 i jest dla mnie na razie niezrozumiała - wolę uzywać kodu, który jest dla mnie zrozumiały; ponadto 
	całość działa nieco wolniej niż przy użyciu prostszego kodu - chociaż w tym wypadku efekt przejścia na mapie nie jest płynny, mapa 
	'przeskakuje' w sposób nagły */
	
	/*flkty.on('change', function(item){
		if(slidesCoords[item] == slidesCoords[2]){
			smoothPanAndZoom(map, 9, slidesCoords[item]);}
			else {smoothPanAndZoom(map, 6, slidesCoords[item]);}
	})*/

}

/*function smoothPanAndZoom(map, zoom, coords){
	var jumpZoom = zoom - Math.abs(map.getZoom() - zoom);
	jumpZoom = Math.min(jumpZoom, zoom -1);
	jumpZoom = Math.max(jumpZoom, 3);
	smoothZoom(map, jumpZoom, function(){
		smoothPan(map, coords, function(){
			smoothZoom(map, zoom); 
		});
	});
};
var smoothZoom = function(map, zoom, callback) {
	var startingZoom = map.getZoom();
	var steps = Math.abs(startingZoom - zoom);
	
	if(!steps) {
		if(callback) {
			callback();
		}
		return;
	}
	var stepChange = - (startingZoom - zoom) / steps;
	var i = 0;
	var timer = window.setInterval(function(){
		if(++i >= steps) {
			window.clearInterval(timer);
			if(callback) {
				callback();
			}
		}
		map.setZoom(Math.round(startingZoom + stepChange * i));
	}, 80);
};
var smoothPan = function(map, coords, callback) {
	var mapCenter = map.getCenter();
	coords = new google.maps.LatLng(coords);
	var steps = 12;
	var panStep = {lat: (coords.lat() - mapCenter.lat()) / steps, lng: (coords.lng() - mapCenter.lng()) / steps};
	var i = 0;
	var timer = window.setInterval(function(){
		if(++i >= steps) {
			window.clearInterval(timer);
			if(callback) callback();
		}
		map.panTo({lat: mapCenter.lat() + panStep.lat * i, lng: mapCenter.lng() + panStep.lng * i});
	}, 1000/30);
};*/