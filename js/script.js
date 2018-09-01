'use strict';

// Szablon

var templateCell = document.getElementById('template-cell').innerHTML;
var listSlides = '';

for(var i = 0; i < slides.length; i++){
	console.log(slides);
	listSlides += Mustache.render(templateCell, slides.length[i]);
}

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
  progress = Math.max( 0, Math.min( 1, progress ) );
  progressBar.style.width = progress * 100 + '%';
});