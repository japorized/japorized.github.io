// Inspired by Eduardo Boucas (@eduardoboucas)
document.querySelector(".loadMore").addEventListener('click', fetchMorePosts);

function fetchMorePosts() {
  var _this = this,
      $blogContainer = document.getElementById('blog_container'),
      nextPage = parseInt($blogContainer.getAttribute("data-curPage")) + 1,
      totalPages = parseInt($blogContainer.getAttribute("data-totalPages"));

  // $(this).addClass("loading");
  _this.classList.add('loading');
  _this.querySelector('.loadMore_txt').style.display = "none";
  _this.querySelector('.pacman').style.display = "block";
  
  AJAXget('/blog/page' + nextPage + '/',
    function(data) {
      window.setTimeout(function() {
        var parseHTML = function(str) {
              var tmp = document.implementation.createHTMLDocument();
              tmp.body.innerHTML = str;
              return tmp.body.children;
            },
            doc = parseHTML(data),
            posts = doc.namedItem('blog').querySelectorAll('article.grid-item'),
            articleFrags = document.createDocumentFragment();

        $blogContainer.setAttribute("data-curPage", nextPage);

        posts.forEach(function(article){
          var a = article;
          a.style = "";
          a.classList.remove('col-12');
          articleFrags.appendChild(a);
        });

        msnryGrid.appendChild(articleFrags);
        msnry.appended(posts);

        if (totalPages == nextPage) {
          var loader = document.querySelector('.loadMore');
          loader.parentNode.removeChild(loader);
        } else {
          _this.querySelector('.pacman').style.display = "none";
          _this.querySelector('.loadMore_txt').style.display = "block";
          _this.classList.remove('loading');
        }
      }, 1500);
    },
    function(xhr) {
      console.log(xhr);
    }
  );
}
