const gulp = require('gulp'),
      changed = require('gulp-changed'),
      rename = require('gulp-rename'),
      uglify = require('gulp-uglify'),
      child = require('child_process'),
      gulpUtil = require('gulp-util'),
      browserSync = require('browser-sync').create();

const JS_SRC = "js/*.js",
      JS_ALL = [ JS_SRC, '!js/global.js', '!js/append-til-post.js' ],
      JS_DEST = "js/min",
      SITE_ROOT = "_site/";
  
gulp.task('minifyjs', () => {
  return gulp.src( JS_ALL )
          .pipe(changed(JS_DEST))
          .pipe(uglify())
          .pipe(rename({ suffix: '.min' }))
          .pipe(gulp.dest(JS_DEST));
});

gulp.task('upgradeJSLib', () => {
  return gulp.src([ 
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/jquery.easing/jquery.easing.min.js',
    'node_modules/mathjax/MathJax.js'
  ]).pipe(gulp.dest(JS_DEST));
});

gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['build',
                    '--watch',
                    '--incremental',
                    '--drafts'
        ]),

        jekyllLog = (buffer) => {
          buffer.toString()
            .split(/\n/)
            .forEach((message) => gulpUtil.log("Jekyll: " + message));
        };

  jekyll.stdout.on('data', jekyllLog);
  jekyll.stderr.on('data', jekyllLog);
});

gulp.task('serve', () => {
  browserSync.init({
    files: [ SITE_ROOT + "/**" ],
    port: 4000,
    server: {
      baseDir: SITE_ROOT
    },
    https: false
  });

  gulp.watch(JS_ALL, 'minifyjs');

});

gulp.task('build', ['minifyjs', 'jekyll']);
gulp.task('default', ['minifyjs', 'jekyll', 'serve' ]);
