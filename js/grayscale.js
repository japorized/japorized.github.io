// Collapse the navbar once page has been scrolled down to about 50px away from the
// top of the document. Document ready function takes care of the navbar not being
// in collapse mode when the user refreshes the browser at a location below 50px
console.log("test");

var $nav = $(".nav");

$(window).on('scroll', function() {
    if ($nav.offset().top > 50) {
        $nav.addClass("top-nav-collapse");
    } else {
        $nav.removeClass("top-nav-collapse");
    }

});

$(function(){
  if ($nav.offset().top > 50) {
    $nav.addClass("top-nav-collapse");
  }
});

// Creating a function that toggles between clicks
// Thanks to Roko C. Buljan on Stackoverflow
// http://stackoverflow.com/questions/4911577/jquery-click-toggle-between-two-functions
// jQuery.fn.clickToggle = function(a,b) {
//   function toggle(){ [b,a][this._tog^=1].call(this); }
//   return this.on("click", toggle);
// };

// Closes the Responsive Menu on Menu Item Click
//      Note: The dropdown menu is only valid in small screens,
//      i.e. phones and tablets

// This function hides the navigation dropdown when one of
//      the links is clicked when we have a small or medium screen
//      being used by the user, and hides the search box if it's active
$(".menu-items a").on('click', function(e) {
    if ( $(window).width() <= 767 ) {
        $(".nav-items").slideUp('fast');
    }

    if ( $(".search").css('display') != 'none' ) {
        $(".search").fadeOut('fast', function(){
          $("#search_box").val('');
          $("#search_results").empty().stop().hide();
        });
    }
});

// This click listener toggles the menu dropdown
// Note: I avoided using the toggling click event for two reasons:
//      1. jQuery does not support it anymore
//      2. When the dropdown is hidden by the above click event,
//         the toggling click event does not record the slideUp, and thus
//         the next click of the menu button does nothing (visually)
$(".menu-dropdown").on('click', function(event) {
    if ($(".nav-items").css("display") == "block") {
        $(".nav-items").slideUp('fast');
    } else {
        $(".nav-items").slideDown('fast');
    }
});

// This resize listener is important to show the .nav-items element
//      when the user resizes from a small or medium screen size to
//      a large one. Without this function, when .nav-items is hidden
//      in the small screen, it will not reappear in the large screen.
$(window).on('resize', function(event) {
    event.preventDefault();
    var displayProperty = $(".nav-items").css("display");

    if ($(window).width() > 767) {
        if ( displayProperty == "none" ) {
            $(".nav-items").css("display", "block");
        }
    } else {
        if ( displayProperty == "block" ) {
            $(".nav-items").css("display", "none");
        }
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo'
        , function(){ $anchor.blur(); });
        event.preventDefault();
    });
});

// Search box UX
$(".searchBtn").on('click', function(event) {
  event.preventDefault();
  toggleSearchBox();
});

var $search = $(".search"),
    // Function to hide search box when clicking outside of it.
    // Unbinds the listener when the search box is hidden.
    // An interesting piece in this snippet is that the function is recursive. ;)
    searchOuterClick = function(e){
      if (!$search.is(e.target) && $search.has(e.target).length == 0 ) {
        $search.fadeOut('fast');
        $(document).unbind("click", searchOuterClick);
      }
    };

function toggleSearchBox() {
  if ( $search.css('display') == "none" ) {
    $(".search").fadeIn('fast', function(){
      $(document).bind("click", searchOuterClick);
    });
    $("#search_box").focus();
  } else {
    $(".search").fadeOut('fast', function(){
      $("#search_box").val('');
      $("#search_results").empty().stop().hide();
    });
  }
}
