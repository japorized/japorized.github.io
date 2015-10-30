$(document).ready(function() {

	// CV Skills Tab
	$(".skillstab .skill_tab").click(function() {
		if ( $(this).hasClass('skill_dev') || $(this).hasClass('m_skill_dev') ) {
			$(this).siblings().removeClass("skill_active");
            
            if ( $(this).hasClass('skill_dev') ) {
                $(this).addClass("skill_active");
                $(this).siblings(".m_skill_dev").addClass("skill_active");
            } else {
                $(this).addClass("skill_active");
                $(this).siblings(".skill_dev").addClass("skill_active");
            }
            
			$(".outer_barContainer").fadeOut("fast");
			$(".outer_pieContainer").delay(200).fadeIn("fast");
		} else {
			$(this).siblings().removeClass("skill_active");
            
            if ( $(this).hasClass('skill_des') ) {
                $(this).addClass("skill_active");
                $(this).siblings(".m_skill_des").addClass("skill_active");
            } else {
                $(this).addClass("skill_active");
                $(this).siblings(".skill_des").addClass("skill_active");
            }
            
			$(".outer_pieContainer").fadeOut("fast");
			$(".outer_barContainer").delay(200).fadeIn("fast");
		}
	});
    
});