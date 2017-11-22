const gulp = require('gulp'),
      changed = require('gulp-changed'),
      uglify = require('gulp-uglifyes'),
      child = require('child_process'),
      gulpUtil = require('gulp-util'),
      htmlmin = require('gulp-htmlmin'),
      browserSync = require('browser-sync').create();

const SITE_ROOT = "_site/",
      JS_SRC = SITE_ROOT + "js/*.js",
      JS_DEST = SITE_ROOT + "js/";
  
gulp.task('upgradeJSLib', () => {
  return gulp.src([ 
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/jquery.easing/jquery.easing.min.js',
    'node_modules/mathjax/MathJax.js'
  ]).pipe(gulp.dest(JS_DEST));
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
  return child.spawn('jekyll', ['build'], {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('minifyjs', () => {
  return gulp.src( JS_SRC )
    .pipe(uglify({
      mangle: false,
      ecma: 6
    }))
    .pipe(gulp.dest(JS_DEST));
});

gulp.task('minifyhtml', (done) => {
  gulp.src(SITE_ROOT + "*.html")
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(SITE_ROOT));

  gulp.src(SITE_ROOT + "**/*.html")
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(SITE_ROOT + "./"));
  
  done();
});

gulp.task('serve', gulp.series('jekyll', () => {
  browserSync.init({
    files: [ SITE_ROOT + "/**" ],
    port: 4000,
    server: {
      baseDir: SITE_ROOT
    },
    https: false
  });
}));

gulp.task('build', gulp.series( 'jekyll-build-only', 'minifyjs', 'minifyhtml' ));
gulp.task('default', gulp.series('serve') );
