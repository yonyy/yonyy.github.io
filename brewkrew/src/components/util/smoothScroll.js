import $ from 'jquery';

function getDuration(target) {
	const currentTop = $(window).scrollTop();
	const rate = 0.75;
	const distance = Math.abs(currentTop - target);
	
	return distance * rate;
}

function smoothScroll(target) {
	var position = $('#' + target).offset().top;
	var duration = getDuration(position);
	$('html, body').animate({
		scrollTop: position
	}, duration);
}

export default smoothScroll;