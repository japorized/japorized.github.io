$(document).ready(function() {

	//hellos snippet - Location: About
	var english = "<center class=\"hellos\" style=\"font-weight: bold; font-size: 50px; padding: 20px 0 20px 0;\">Hello</center>",
		mandarin = "<center class=\"hellos\" style=\"font-weight: bold; font-size: 50px; padding: 20px 0 20px 0;\">你好!!</center>",
		malay = "<center class=\"hellos\" style=\"font-weight: bold; font-size: 50px; padding: 20px 0 20px 0;\">Apa khabar?</center>",
		japanese = "<center class=\"hellos\" style=\"font-weight: bold; font-size: 50px; padding: 20px 0 20px 0;\">こにちわ！初めまして‼︎</center>",
		counter = 0,
		helloTimer = setInterval(function() { 
	  		$(".post-content > .hellos").text(function() {
	  			if (counter < 4) {
	  				switch (counter) {
	  				case 0:
						$(this).fadeOut("fast", function() {
							$(this).replaceWith(mandarin);
							$(".hellos").fadeIn("fast");
						});
						counter++;
						break;
					case 1:
						$(this).fadeOut("fast", function() {
							$(this).replaceWith(malay);
							$(".hellos").fadeIn("fast");
						});
						counter++;
						break;
					case 2:
						$(this).fadeOut("fast", function() {
							$(this).replaceWith(japanese);
							$(".hellos").fadeIn("fast");
						});
						counter++;
						break;
					default:
						$(this).fadeOut("fast", function() {
							$(this).replaceWith(english);
							$(".hellos").fadeIn("fast");
						});
						counter++;
						break;
					}
				} else {
					clearInterval(helloTimer);
				}
	  	});
		},  800);
});