$(document).ready(function(){
	var $title_img = $(".title_img");

	// Adjust height of the div to fit the height of the image
	$title_img.height( $title_img.children('img').height() );

	// Hover Action: Slide up to display caption, slide down to hide caption
	$title_img.hover(function() {
		/* Stuff to do when the mouse enters the element */
		$(this).children('figcaption').animate({"margin-bottom": "0px"}, 'fast');

	}, function() {
		/* Stuff to do when the mouse leaves the element */
		$(this).children('figcaption').animate({"margin-bottom": "-50px"}, 'fast');
	});
});