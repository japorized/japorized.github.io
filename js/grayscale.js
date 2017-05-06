/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".nav").offset().top > 50) {
        $(".nav").addClass("top-nav-collapse");
    } else {
        $(".nav").removeClass("top-nav-collapse");
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

// Creating a function that toggles between clicks
jQuery.fn.clickToggle = function(a,b) {
  function cb(){ [b,a][this._tog^=1].call(this); }
  return this.on("click", cb);
};

// Closes the Responsive Menu on Menu Item Click
$(".menu-dropdown").clickToggle(function() {
    $(".smallScreen-menu").slideDown('fast');
}, function() {
    $(".smallScreen-menu").slideUp('fast');
});

$(".smallScreen-menu-list li").click(function(e) {
    e.preventDefault();
    $(".smallScreen-menu").slideUp('fast');
});