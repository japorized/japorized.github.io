// Navigation index anchoring updates
var sectionPos = [],
  	sectionID = [];

// This each function serves to check for all the sections in the index
// page, and pushes their this.offsetTop - parseFloat(this__paddingTop)
// position and their section ID into 2 different arrays. This method of organization
// allows us to add more sections to the index page without having to further add more
// items to this JS file.
// Note that we reduce by parseFloat(this__paddingTop) so that the detection
// accurately returns to us the top of the section, instead of where the content has been
// padded to
document.querySelectorAll("section").forEach(function(section){
  var this__paddingTop = window.getComputedStyle(section, null).getPropertyValue('padding-top');
	sectionPos.push(section.offsetTop - parseFloat(this__paddingTop));
	sectionID.push("#" + section.getAttribute('id'));
});

window.addEventListener('scroll', function() {
	var scrollPos = window.pageYOffset,
	    sectionFound = false,
      activeItem = document.querySelector('a.nav-item.active'),
      newItem;

	for (var i = 0; i < sectionPos.length ; i++) {
    newItem = document.querySelector('a.nav-item[href="' + sectionID[i] + '"]');
		if ( i != sectionPos.length - 1 ) {
			if ( scrollPos >= sectionPos[i] && scrollPos < sectionPos[i + 1] ) {
				// This condition checks if the current scroll position is sandwiched
				// between two sections, thus allowing us to determine which nav-item
				// should get the active class
        if ( activeItem == null ) {
          newItem.classList.add('active');
        } else if ( activeItem.getAttribute('href') != sectionID[i] ) {
					activeItem.classList.remove('active');
					newItem.classList.add('active');
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
        if ( activeItem == null ) {
          newItem.classList.add('active');
        } else if ( activeItem.getAttribute('href') != sectionID[i] ) {
					activeItem.classList.remove('active');
					newItem.classList.add('active');
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
	if ( activeItem != null && !sectionFound ) {
		// $('a.nav-item.active').length returns 0 if such an element
		// does not exist, which is false, and 1 otherwise
		// With this condition, the first time when we scroll up to
		// the header, $('a.nav-item.active').length will be 1, but no
		// sections can be found in this case, thus we remove the active
		// class from the active nav-item	
		activeItem.classList.remove('active');
	}
});
