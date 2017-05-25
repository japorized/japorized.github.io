// Inspired by Eduardo Boucas (@eduardoboucas)
	$(".loadMore").click(fetchMorePosts);

	function fetchMorePosts() {
	  var _this = this;
	  var $blogContainer = $("#blog_container");
	  var nextPage = parseInt($blogContainer.attr("data-curPage")) + 1;
	  var totalPages = parseInt($blogContainer.attr("data-totalPages"));

	  $(this).addClass("loading");
	  $(this).find(".loadMore_txt").hide().end().find(".pacman").css('display', 'block');
	  
	  window.setTimeout(function(){
	  	$.get("/blog/page" + nextPage + "/", function (data) {
		    var htmlData = $.parseHTML(data);
		    var $articles = $(htmlData).find("article").hide().css("padding-top", "50px");

		    $blogContainer.attr("data-curPage", nextPage).append($articles);

		    $articles.fadeIn({queue: false, duration: 'slow'}).animate({paddingTop: "-40px"}, 'slow');

		    if (totalPages == nextPage) {
		      $(".loadMore").remove();
		    }

		    $(_this).find(".pacman").css('display', 'none').end().find(".loadMore_txt").show();
		    $(_this).removeClass("loading");
		  });  

	  }, 1500);
	}

$(document).ready(function() {

	// Lazyload Initiate
	$("img.lazy").lazyload({
		effect: "fadeIn"
	});
});