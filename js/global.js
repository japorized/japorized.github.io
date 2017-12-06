// Masonry.js Initiate
var msnryGrid = document.querySelector('.grid');
if (msnryGrid != null) {
  var msnry = new Masonry( msnryGrid, {
        // options
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        transitionDuration: '0.2s',
        percentPosition: true
      });
}

// Lazyload Initiate
$("img.lazy").lazyload({
	effect: "fadeIn"
});

//
//  Script in reference to RayHightower
//  http://rayhightower.com/blog/2016/01/04/how-to-make-lunrjs-jekyll-work-together/
//
document.addEventListener('DOMContentLoaded', function(event) {
  // Initialize lunr with the fields to be searched, plus the boost.
  window.idx = lunr(function () {
    this.field('id');
    this.field('title');
    this.field('description');
    this.field('content', { boost: 10 });
    this.field('categories');
  });

  // Get the generated search_data.json file so lunr.js can search it locally.
  window.data = $.getJSON('/searchData.json');

  // Wait for the data to load and add it to lunr
  window.data.then(function(loaded_data){
    $.each(loaded_data, function(index, value){
      window.idx.add(
        $.extend({ "id": index }, value)
      );
    });
  });

  // Event when the form is submitted
  document.getElementById('site_search').addEventListener('submit', function(e) {
    e.preventDefault();
    var query = document.getElementById('search_box').value,
        results = window.idx.search(query);
    display_search_results(results);
    document.getElementById('search_results').style.display = 'block';
  });

  // $("#site_search").submit(function(event){
  //     event.preventDefault(); // RTH: per Google, preventDefault() might be the culprit in Firefox
  //     var query = $("#search_box").val(); // Get the value for the text field
  //     var results = window.idx.search(query); // Get lunr to perform a search
  //     display_search_results(results); // Hand the results off to be displayed
  //     $("#search_results").show();
  // });

  function display_search_results(results) {
    var $search_results = document.getElementById('search_results');

    // Wait for data to load
    window.data.then(function(loaded_data) {

      // Are there any results?
      if (results.length) {
        $search_results.innerHTML = ''; // Clear old results

        // Iterate over the results
        results.forEach(function(result) {
          var item = loaded_data[result.ref];

          // Build a snippet of HTML for this result
          var appendString = '<li><a href="' + item.url + '">' + item.title + '</a></li>';

          // Add the snippet to the collection of results.
          $search_results.innerHTML += appendString;
        });
      } else {
        // If there are no results, let the user know.
        $search_results.innerHTML = '<li>No results found</li>';
      }
    });
  }
});
