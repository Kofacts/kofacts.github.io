$(document).ready(function () {
	//
	$('.theme-selector').on('click', function (e) {
		$('body').css('background', 'black').fadeIn('slow');
		$('body').css('color', 'white');
		$('a.menu-link:active').css('color','white !important');
		$('a.menu-link').css('color','white !important');
		$('sup.label').css('color', 'black');
	})

	$('.about').click(function(e) {
		window.location.href = 'https://about.me/obodugo';
	})
	$('.contact').click(function(e) {
		window.location.href = 'mailto:obodugorapheal@gmail.com'
	})

});

function goTo(link) {
	window.location.href = link;
}
particlesJS.load('particles-js', 'js/particles.json', function () {
	console.log('callback - particles.js config loaded');
});