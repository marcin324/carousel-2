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

var flkty = new Flickity( '.main-carousel', {
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

flkty.on( 'scroll', function( progress ) {
  progress = Math.max( 0, Math.min( 1, progress ));
  progressBar.style.width = progress * 100 + '%';
});

// Mapa

window.initMap = function() {
	
	var slidesCoords = slidesData.map(function(x){
		return x.coords;
	})

	var map = new google.maps.Map(document.getElementById('map'),{
		zoom: 6,
		center: slidesCoords[0]
	});

	slidesCoords.forEach(function(x){
		var marker = new google.maps.Marker({
			position: x,
			map: map
		})
	});
}