$(document).ready(function() {

	// LazyLoad 1.9.3
	$("img").lazyload({
		effect: "fadeIn"
	});

	// CV Skills Tab
	$(".skillstab ul li").click(function() {
		if ( $(this).text() === "Development" ) {
			$(this).siblings().removeClass("skill_active");
			$(this).addClass("skill_active");
			$(".outer_barContainer").fadeOut("fast");
			$(".outer_pieContainer").delay(200).fadeIn("fast");
		} else {
			$(this).siblings().removeClass("skill_active");
			$(this).addClass("skill_active");
			$(".outer_pieContainer").fadeOut("fast");
			$(".outer_barContainer").delay(200).fadeIn("fast");
		}
	});
	
});