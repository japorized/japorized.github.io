//
//	Big Title Image Caption Animations
//
var $title_img = $(".title_img");

function adjustHeight() {
	$("#title_img").on('load', function(e) {
		e.preventDefault();
		e.stopPropagation();
		// Adjust height of the div to fit the height of the image
		var childImgHeight = $(this).height();
		$title_img.height(childImgHeight);
	});
}

window.onload = adjustHeight();
$(document).ready(function(){
	adjustHeight();
});

// Hover Action: Slide up to display caption, slide down to hide caption
$title_img.hover(function() {
	/* Stuff to do when the mouse enters the element */
	$(this).children('figcaption').animate({"margin-bottom": "0px"}, 'fast');

}, function() {
	/* Stuff to do when the mouse leaves the element */
	$(this).children('figcaption').animate({"margin-bottom": "-50px"}, 'fast');
});