# { Japorized } japorized.github.io
### { Personal } Jekyll Theme

Big thanks to [{ PannosSakkos }](https://github.com/PanosSakkos/personal-jekyll-theme) to have created this theme.
I have since changed the CSS framework of the site to use WingCSS instead of Twitter Bootstrap, and have since not followed the development of the theme under by PannosSakkos.

### CSS Framework in use
[WingCSS](https://github.com/KingPixil/wing)

### Special thanks to these sources
* [jQuery](http://jquery.com)
* [FontAwesome](http://fontawesome.io) for awesome icons
* Eduardo Boucas for the inspiration on Ajaxifying the Blog Index Page.
* [MathJax](https://www.mathjax.org/) for parsing LaTeX in HTML
* [Featherlight](http://noelboss.github.io/featherlight/) as the light lightbox plugin.
* [Loaders.css](https://connoratherton.com/loaders) for the pure css Pacman loader <3
* [FitText](https://github.com/davatron5000/FitText.js) auto-scaling the font size for the first blog post.
* [Masonry](https://masonry.desandro.com) for the masonry layout and methods.
* [Lunr.js](https://lunrjs.com) for the quick static site search, right from the client's side. Thanks [RayHighTower](http://rayhightower.com/blog/2016/01/04/how-to-make-lunrjs-jekyll-work-together/) for the guide.


### TODO
* Navigation System needs a rework with both TIL and Math contents added
* Switch from using the Jekyll build tool from Github Pages to TravisCI
  * utilize newer Jekyll version
  * open up choice for more Jekyll plugins
  * perhaps switch to Pandoc for certain page generation (e.g. regenerate CV into a pdf on build)
  * better control over build process (e.g. minifying js)
  * automatically build my categories and tags (finally never forgetting those)
* Slowly breaking away from being overly dependent on jQuery
* Get local copy of jQuery easing 1.4 (planning to use npm for this)
* Check how to get MathJax back (planning to use npm for this)
* SEO? There is a gem for this `jekyll-seo-tags`
* Check if syntax highlighting needs highlight.min.js
