var sectionPos = [],
	sectionID = [];

// This each function serves to check for all the sections in the index
// page, and pushes their .offset().top - parseFloat($this.css('padding-top'))
// position and their section ID into 2 different arrays. This method of organization
// allows us to add more sections to the index page without having to further add more
// items to this JS file.
// Note that we reduce by parseFloat($this.css('padding-top')) so that the detection
// accurately returns to us the top of the section, instead of where the content has been
// padded to
$("section").each(function() {
	$this = $(this);
	sectionPos.push($this.offset().top - parseFloat($this.css('padding-top')));
	sectionID.push("#" + $this.attr('id'));
});

$(window).scroll(function(){
	var scrollPos = $("body").scrollTop();
	var sectionFound = false;

	for (var i = 0; i <= sectionPos.length - 1 ; i++) {
		if ( i != sectionPos.length - 1 ) {
			if ( scrollPos >= sectionPos[i] && scrollPos < sectionPos[i + 1] ) {
				// This condition checks if the current scroll position is sandwiched
				// between two sections, thus allowing us to determine which nav-item
				// should get the active class
				if ( $("a.nav-item.active").attr('href') != sectionID[i] ) {
					$('a.nav-item.active').removeClass('active');
					$("a.nav-item[href='" + sectionID[i] + "']").addClass('active');
				}
				sectionFound = true;
				break;
			}
		} else {
			// This is the case where we are looking at the final section,
			// i.e. i = sectionPos.length - 1. We take this case under a different block
			// since the condition is different from the condition above for the sections
			// in between
			if ( scrollPos >= sectionPos[i] ) {
				if ( $("a.nav-item.active").attr('href') != sectionID[i] ) {
					$('a.nav-item.active').removeClass('active');
					$("a.nav-item[href='" + sectionID[i] + "']").addClass('active');
				}
				sectionFound = true;
				break;
			}
		}
	}

	// In this case, we are not looking at any of the sections in the
	// middle, and especially not the last section. Thus we have secluded
	// the only possible case, that is the header, and in this case we want
	// to remove .active from all the nav-items
	if ( $('a.nav-item.active').length && !sectionFound ) {
		// $('a.nav-item.active').length returns 0 if such an element
		// does not exist, which is false, and 1 otherwise
		// With this condition, the first time when we scroll up to
		// the header, $('a.nav-item.active').length will be 1, but no
		// sections can be found in this case, thus we remove the active
		// class from the active nav-item	
		$('a.nav-item.active').removeClass('active');
	}

});