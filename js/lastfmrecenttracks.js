function lfmMostRecentTrack(JSONdata) {
  var oTrack = (new Array().concat(JSONdata.recenttracks.track))[0];
  if(oTrack.image[3]["#text"] != "")
    document.getElementById("lfmMostRecentTrackImage").src = oTrack.image[3]["#text"];
  if(oTrack.streamable == "1")
    document.getElementById("lfmMostRecentTrackPlayIcon").style.display = "inline";
  document.getElementById("lfmMostRecentTrackArtist").innerHTML = oTrack.artist["#text"];
  document.getElementById("lfmMostRecentTrackTitle").href = oTrack.url;
  document.getElementById("lfmMostRecentTrackTitle").innerHTML = oTrack.name;
  document.getElementById("lfmMostRecentTrackAlbum").innerHTML = oTrack.album["#text"];
  document.getElementById("lfmMostRecentTrackDate").innerHTML = (typeof oTrack.date=="undefined"?"Now Playing":oTrack.date["#text"]);
}