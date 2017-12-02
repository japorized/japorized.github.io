const gulp = require('gulp'),
      changed = require('gulp-changed'),
      uglify = require('gulp-uglifyes'),
      child = require('child_process'),
      gulpUtil = require('gulp-util'),
      htmlmin = require('gulp-htmlmin'),
      imagemin = require('gulp-imagemin'),
      pngquant = require('imagemin-pngquant'),
      jpegtran = require('imagemin-jpegtran'),
      gifsicle = require('imagemin-gifsicle'),
      browserSync = require('browser-sync').create();

const SITE_ROOT = "_site/",
      SITE_IMG = SITE_ROOT + "img/",
      JS_SRC = SITE_ROOT + "js/*.js",
      JS_DEST = "js/";
  
gulp.task('upgradeJSLib', () => {
  return gulp.src([ 
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/jquery.easing/jquery.easing.min.js',
    'node_modules/mathjax/MathJax.js'
  ]).pipe(gulp.dest(JS_DEST));
});

gulp.task('generateTags', (done) => {
  const genTags = child.spawn('scripts/generate-tags', [''], {stdio: 'inherit'}),
        genCats = child.spawn('scripts/generate-categories', [''], {stdio: 'inherit'});
  done();
});

gulp.task('minifyimg', (done) => {
  return gulp.src([
    SITE_IMG + '*.jpg', SITE_IMG + '*.jpeg', SITE_IMG + '*.png', SITE_IMG + '*.gif',
    SITE_IMG + '**/*.jpg', SITE_IMG + '**/*.jpeg', SITE_IMG + '**/*.png', SITE_IMG + '**/*.gif' 
  ])
    .pipe(imagemin({
        progressive: false,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant(), jpegtran(), gifsicle()]
    }))
    .pipe(gulp.dest(SITE_IMG));
});

gulp.task('jekyll', (done) => {
  const jekyll = child.spawn('jekyll', ['build',
                    '--watch',
                    '--incremental'
        ]),

        jekyllLog = (buffer) => {
          buffer.toString()
            .split(/\n/)
            .forEach((message) => gulpUtil.log("Jekyll: " + message));
        };
  jekyll.stdout.on('data', jekyllLog);
  jekyll.stderr.on('data', jekyllLog);
  done();
});

gulp.task('jekyll-build-only', (done) => {
  const jekyll = child.spawn('jekyll', ['build'], {stdio: 'inherit'});
  done();
});

gulp.task('minifyjs', () => {
  return gulp.src( JS_SRC )
    .pipe(uglify({
      mangle: false,
      ecma: 6
    }))
    .pipe(gulp.dest(SITE_ROOT + "js/"));
});

gulp.task('minifyhtml', (done) => {
  return gulp.src([
      SITE_ROOT + "*.html",
      SITE_ROOT + "**/*.html"
    ])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(SITE_ROOT + "./"));
});

gulp.task('serve', gulp.series('jekyll', (done) => {
  browserSync.init({
    files: [ SITE_ROOT + "/**" ],
    port: 4000,
    server: {
      baseDir: SITE_ROOT
    },
    https: false
  });

  done();
}));

gulp.task('build', gulp.series( 'jekyll-build-only', 'minifyjs', 'minifyhtml'));
gulp.task('default', gulp.series('serve') );
