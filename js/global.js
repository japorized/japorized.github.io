---
---
// Masonry.js
var $grid = $('.grid').masonry({
  // options
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  transitionDuration: '0.2s',
  percentPosition: true
});

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
	    var $articles = $(htmlData).find("article");

	    $blogContainer.attr("data-curPage", nextPage);

	    $articles.attr('style', '');

	    console.log($articles);

	    $articles.addClass("grid-item").removeClass("col-12");

	    $grid.append($articles).masonry('appended', $articles);

	    if (totalPages == nextPage) {
	      $(".loadMore").remove();
	    }

	    $(_this).find(".pacman").css('display', 'none').end().find(".loadMore_txt").show();
	    $(_this).removeClass("loading");
	  });  

  }, 1500);
}

// Lazyload Initiate
$("img.lazy").lazyload({
	effect: "fadeIn"
});

$(function(){
	var base_url = "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=johnson5756&api_key=05639839701ccb3b35cfaf6bd2944037&format=json"

	$.getJSON(base_url, function(data){
    var showLimit = 1,
        albumCoverSize = 'large';
		if($.type(data.recenttracks.track) === "array") {
			showLimit = 3;
			var	recentTracks = [],
					listeningText = "Recently listened to "
			for (var i = 0; i < showLimit; i++) {
				recentTracks[i] = data.recenttracks.track[i];
			}
		} else { return; }
		
		$(".lastfm-displayText").text(listeningText);

    for (var i = 0; i < showLimit; i++) {
      var trackName = recentTracks[i].name,
          trackArtist = recentTracks[i].artist['#text'],
          lastfmURL = recentTracks[i].url;

      for (var j = 0; j < recentTracks[i].image.length; j++){
        if (recentTracks[i].image[j].size == albumCoverSize) {
          var albumURL = recentTracks[i].image[j]['#text'];
          if (albumURL == "") {
            albumURL = "{{ site.baseurl }}/img/noartwork.jpg";
          }
        }
      }

      var song = '<div class="track"><a href="' + lastfmURL + '" target="_blank"><div class="album-cover"><img src="' + albumURL + '" /></div><div class="trackDesc"><div class="track-artist">' + trackArtist + '</div><div class="track-name">' + trackName  + '</div></div></a></div>';
      $(".lastfm-recent").append($( song ));
    }
		
	});
});

