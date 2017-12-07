document.addEventListener('DOMContentLoaded', event => {
  var kitsuTitleStr = "Recent Anime",
      kitsuStatsAPIURL = "https://kitsu.io/api/edge/stats/770287",
      kitsuUserLibAPIURL = "https://kitsu.io/api/edge/users/58006/library-entries",
      kitsuAnimeAPIbaseURL = "https://kitsu.io/api/edge/library-entries/";

  var stats = document.querySelector('.kitsu__stats'),
      recentlyWatched = document.querySelector('.kitsu__recent-watched'),
      recentlyCompleted = document.querySelector('.kitsu__recent-completed'),
      kitsuTitle = document.querySelector('.kitsu__title-text');

  getJSON(
    kitsuStatsAPIURL,
    function(data) {
      kitsuTitle.innerHTML += kitsuTitleStr;
      stats.innerHTML += "Total completed: " + data.data['attributes']['statsData']['all_time']['total_media'];
    },
    function(xhr) { console.error(xhr); }
  );

  getJSON(
    kitsuUserLibAPIURL + "?filter[status]=current",
    function(data) {
      for ( var i = 0; i < 3; i++ ) {
        getJSON(
          kitsuAnimeAPIbaseURL + data.data[i].id + "/anime",
          function(anime) {
            getAnime(anime, recentlyWatched);
          },
          function(xhr) { console.error(xhr); }
        )
      }
    },
    function(xhr) { console.error(xhr); }
  );

  getJSON(
    kitsuUserLibAPIURL + "?filter[status]=completed",
    function(data) {
      for ( var i = 0; i < 3; i++ ) {
        getJSON(
          kitsuAnimeAPIbaseURL + data.data[i].id + "/anime",
          function(anime) {
            getAnime(anime, recentlyCompleted);
          },
          function(xhr) { console.error(xhr); }
        )
      }
    },
    function(xhr) { console.error(xhr); }
  );

  function getAnime(anime, container) {
    var animeContainer = `
    <a class="kitsu__anime" href="https://kitsu.io/anime/${anime.data.id}">
      <img class="lazy" src="${anime.data.attributes.posterImage.small}" />
      <br />
      <small>${anime.data.attributes.titles.ja_jp}</small>
    </a>
    `;

    container.innerHTML += animeContainer;
  }

});
