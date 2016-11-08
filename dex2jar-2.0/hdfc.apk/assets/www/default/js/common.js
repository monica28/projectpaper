$(document).ready(function() {
	
	$('.default-slider').iosSlider({
		desktopClickDrag: true,
		navNextSelector: $('.default-slider .next'),
		navPrevSelector: $('.default-slider .prev')
	});
	
	$('.default-slider-container .goToBlock .go').each(function(i) {
		$(this).bind('click', function() {
			$('.default-slider').iosSlider('goToSlide', i + 1);
		});
	});
	
	$('.snap-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true
	});
	
	$('.infinite-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true
	});
	
	$('.responsive-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true,
		responsiveSlideWidth: false
	});
	
	$('.autoslide-slider1').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		autoSlide: true,
		startAtSlide: '2',
		scrollbar: true
	});
	
	$('.autoslide-slider2').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true,
		autoSlide: true,
		startAtSlide: '2',
		scrollbar: true,
		navNextSelector: $('.autoslide-slider2 .next'),
		navPrevSelector: $('.autoslide-slider2 .prev')
	});
	
	$('.autoslide-slider2-container .goToBlock .go').each(function(i) {
		$(this).bind('click', function() {
			$('.autoslide-slider2').iosSlider('goToSlide', i + 1);
		});
	});
	
	$('.variable-width-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true
	});
	
	$('.short-width-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true
	});
	
	
	
	$('.destroy-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true,
		autoSlide: true,
		navNextSelector: $('.destroy-slider .next'),
		navPrevSelector: $('.destroy-slider .prev')
	});
	
	$('.destroy-slider-container .goToBlock .go').each(function(i) {
		$(this).bind('click', function() {
			$('.destroy-slider').iosSlider('goToSlide', i + 1);
		});
	});
	
	$('.destroy-slider-container .destInitBlock .dest').each(function(i) {
	
		$(this).bind('click', function() {
			$('.destroy-slider').iosSlider('destroy');
		});
	
	});
	
	$('.destroy-slider-container .destInitBlock .init').each(function(i) {
	
		$(this).bind('click', function() {
			$('.destroy-slider').iosSlider({
				desktopClickDrag: true,
				snapToChildren: true,
				infiniteSlider: true,
				autoSlide: true,
				navNextSelector: $('.destroy-slider .next'),
				navPrevSelector: $('.destroy-slider .prev')
			});
		});
	
	});
	
	$('.callback-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true,
		navSlideSelector: $('.callback-slider .paging .box'),
		onSliderLoaded: callbackSliderLoadedChanged,
		onSlideChange: callbackSliderLoadedChanged,
		onSlideComplete: callbackSliderComplete
	});
	
	$('.callback-slider-container .goToBlock .go').each(function(i) {
		$(this).bind('click', function() {
			$('.callback-slider').iosSlider('goToSlide', i + 1);
		});
	});
	
	$('.full-width-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true
	});
	
	$('.form-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true
	});
	
	$('.media-query-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true
	});
	
});

function callbackSliderLoadedChanged(args) {
	
	$(args.sliderObject).siblings('.paging').children('.box').removeClass('selected');
	$(args.sliderObject).siblings('.paging').children('.box:eq(' + (args.currentSlideNumber - 1) + ')').addClass('selected');
	
}

function callbackSliderComplete(args) {
	
	//console.log(args);
	
}

function slideComplete(args) {
Customer_accNum_Video = $(args.currentSlideObject).find('a').attr('acc'); 
	$('.next, .prev').removeClass('unselectable');
	if(args.currentSlideNumber == 1) {
		$('.prev').addClass('unselectable');
	} else if(args.currentSliderOffset == args.data.sliderMax) {
		$('.next').addClass('unselectable');
	}
}



