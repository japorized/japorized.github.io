// LastFM Recent Tracks Fetcher
document.addEventListener('DOMContentLoaded', function() {
	var base_url = "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=johnson5756&api_key=05639839701ccb3b35cfaf6bd2944037&format=json"

  getJSON(base_url,
    function(data) {
      var showLimit = 1,
          albumCoverSize = 'large';
		  // if($.type(data.recenttracks.track) === "array") {
      if (type(data.recenttracks.track) === "array") {
		  	showLimit = 3;
		  	var	recentTracks = [],
		  			listeningText = "Recently listened to ",
            i = 0,
            counter = -1,
            albumExists = false,
            iteratedTrack;

        // Pick the tracks in a way such that all 3 tracks are not from the same album
		  	do {
          albumExists = false;
          iteratedTrack = data.recenttracks.track[++counter];
          for (var j = 0; j < recentTracks.length; j++) {
            if (recentTracks[j].album['#text'] == iteratedTrack.album['#text']) {
              albumExists = true;
            }
          }

          if (!albumExists){
		  		  recentTracks[i++] = iteratedTrack;
          }
		  	} while (i < showLimit);
		  } else { return; }
		  
      document.querySelector('.lastfm-displayText').innerHTML = listeningText;

      for (var i = 0; i < showLimit; i++) {
        var trackName = recentTracks[i].name,
            trackArtist = recentTracks[i].artist['#text'],
            lastfmURL = recentTracks[i].url;

        for (var j = 0; j < recentTracks[i].image.length; j++){
          if (recentTracks[i].image[j].size == albumCoverSize) {
            var albumURL = recentTracks[i].image[j]['#text'];
            if (albumURL == "") {
              albumURL = "/img/noartwork.jpg";
            }
          }
        }

        var song = '<div class="track"><a href="' + lastfmURL + '" target="_blank"><div class="album-cover"><img class="lazy" src="' + albumURL + '" /></div><div class="trackDesc"><div class="track-artist">' + trackArtist + '</div><div class="track-name">' + trackName  + '</div></div></a></div>';
        document.querySelector('.lastfm-recent').innerHTML += song;
      }

    },
    function(xhr) {
      console.error(xhr);
    }
  );
});
