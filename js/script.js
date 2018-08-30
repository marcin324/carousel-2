'use strict';

var flkty = new Flickity( '.main-carousel', {
	wrapAround: true,
	pageDots: false, // Ten sam efekt można uzyskać w pliku stylów dla kropek 'display: none;'
	hash: true, // 
	/*flkty.next(); // przycisk 'restart'
    flkty.select(0); // przycisk 'restart'*/
	cellAlign: 'left',
	contain: true
});

document.getElementById('restart').addEventListener('click', function() {
    flkty.next(); // przycisk 'restart'
    flkty.select(0);
});