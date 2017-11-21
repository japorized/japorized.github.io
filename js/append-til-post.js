---
---

const PAGINATE_LIMIT = {{ site.til_paginate }};
var til_posts_json,
    $outer_container = document.querySelector('.outer-container__til'),
    $loadMoreButton = document.querySelector('#loadMore__til');

/*
 * addOlderTILs(offset)
 * @param offset - beginning of iteration on the json variable
 * Function that assembles the next PAGINATE_LIMIT posts and appends them to
 * the list of existing TILS. The main for loop stops looking for TIL posts
 * after the last json object, and proceeds to remove the Load More button.
 */
function addOlderTILs(offset) {
  for ( var i = offset; i <= offset + PAGINATE_LIMIT - 1; i++ ) {
    // Check if the current iteration is still within scope of the TIL posts that were not
    // not the first PAGINATE_LIMIT posts
    if ( i < Object.size(til_posts_json) ) {
      // Parsing tags first, since it has its inner objects
      var tagsHtmlStrArr = [],
          tagsHtmlStr;

      for ( var tag in til_posts_json[i].tags ) {
        tagsHtmlStrArr.push(`<a href="{{ site.baseurl }}/tags/${ til_posts_json[i].tags[tag] }.html">${ til_posts_json[i].tags[tag] }</a>`);
      }

      // Concatenate all the links in the tagsHtmlStrArr
      tagsHtmlStr = tagsHtmlStrArr.join(', ');

      // Constructing the face of the TIL post
      // Could this be further shortened if I use an include method from Liquid? Or will
      // that make this too messy to keep?
      var iteratedPost = `
        <hr />
        <div class="post-container__til">
          <div class="post-info-container__til">
            <ul class="post-info__til">
              <li><span class="fa fa-calendar-o"></span> ${til_posts_json[i].date}</li>
              <li><span class="fa fa-comment-o"></span> <a href="{{ site.baseurl }}${ til_posts_json[i].url }/#comments-container">${til_posts_json[i].comments} Comments</a></li>
              <li><span class="fa fa-hashtag"></span> ${tagsHtmlStr}</li>
            </ul>
          </div>
          <div class="post-content__til">
            <div class="post-title__til">
              <h1>
                <a href="{{ site.baseurl }}${ til_posts_json[i].url }">${ til_posts_json[i].title }</a>
              </h1>
            </div>
            <div class="post-excerpt__til">
              ${til_posts_json[i].content}
              <br />
              <a href="{{ site.baseurl }}${ til_posts_json[i].url }">Read on  <span class="fa fa-angle-right"></span></a>
            </div>
          </div>
        </div>
        `;

      // Append TIL post to existing list of TIL posts
      $outer_container.innerHTML += iteratedPost;
    } else {
      // If the loop has gone through all the remaining posts, remove the listener on the 
      // Load More button, and remove the button itself. Then break from the main for loop.
      $loadMoreButton.removeEventListener('click', addOlderTILs, false);
      $loadMoreButton.parentNode.removeChild($loadMoreButton);
      break;
    }
  }
}

// Once the document loads, fetch the json file, and begin event listening on Load
// More button.
document.addEventListener("DOMContentLoaded", function(event) {
  var click_counter = 0,
      til_posts_src = "/til-posts.json",
      request = new XMLHttpRequest();

  request.open('GET', til_posts_src);
  request.responseType = 'json';
  request.send();
  request.onload = function () {
    til_posts_json = request.response;
  }

  $loadMoreButton.addEventListener('click', function(event) {
    event.preventDefault();
    addOlderTILs(click_counter++ * PAGINATE_LIMIT);
  }, false);
});
