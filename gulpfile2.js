​
'use strict';
​
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    rev = require('gulp-rev'),
    revplace = require('gulp-revplace'),
    es = require('event-stream'),
    del = require('del'),
    baseDir = 'http/dev';
​
// Scripts
gulp.task('lintScripts', function () {
  return gulp.src('http/js/application.js')
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('default'))
      .pipe(notify({message: 'Lint scripts task complete'}));
});
​
gulp.task('scripts', function () {
  return gulp.src([
    'http/js/vendor/bootstrap/affix.js', 'http/js/vendor/bootstrap/scrollspy.js',
    'http/js/vendor/bootstrap/transition.js', 'http/js/vendor/bootstrap/collapse.js',
    'http/js/vendor/bootstrap/modal.js',
    'http/js/vendor/angular/angular-sanitize.js', 'http/js/vendor/angular/angular-messages.js',
    'http/js/vendor/angular/angular-animate.js', 'http/js/vendor/angular/angular-touch.js',
    'http/js/vendor/angular-carousel/angular-carousel.js',
    'http/js/vendor/angular-ui/mask.js',
    'http/js/vendor/jquery.placeholder.js',
    'http/js/application.js',
    'http/js/angular/app.js',
    'http/js/angular/**/*.js'
  ])
      .pipe(concat('application.js'))
      .pipe(gulp.dest('http/dev/js'))
      .pipe(notify({message: 'Scripts task complete'}));
});
​
// Styles
gulp.task('styles', function () {
  return sass('http/sass/application.scss', {style: 'expanded'})
      .pipe(gulp.dest('./http/dev/css'))
      .pipe(notify({message: 'Styles task complete'}));
});
​
// Images
gulp.task('images', function () {
  return gulp.src('http/img/*')
      .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
      .pipe(gulp.dest('http/dev/img'))
      .pipe(notify({message: 'Images task complete'}));
});
​
// Build Scripts
gulp.task('buildScripts', function () {
  return gulp.src('http/dev/js/application.js')
      .pipe(uglify())
      .pipe(rev())
      .pipe(gulp.dest('http/dist/js'))
      .pipe(notify({message: 'Build scripts task complete'}));
});
​
// Revplace Image Paths
gulp.task('revplaceImagePaths', function () {
  return es.merge(
      gulp
          .src([baseDir + '/css/application.css'], {base: baseDir}),
      gulp
          .src([baseDir + '/img/*.*'], {base: baseDir + '/img'})
          .pipe(rev())
  )
      .pipe(revplace({
        addPrefix: '../img/'
      }))
      .pipe(gulp.dest('http/build'));
});
​
// Build Styles
gulp.task('buildStyles', ['revplaceImagePaths'], function () {
  return gulp.src('http/build/css/application.css')
      .pipe(minifycss())
      .pipe(rev())
      .pipe(gulp.dest('http/dist/css'))
      .pipe(notify({message: 'Build styles task complete'}));
});
​
// Build Images
gulp.task('buildImages', function () {
  return gulp.src('http/dev/img/*')
      .pipe(rev())
      .pipe(gulp.dest('http/dist/img'))
      .pipe(notify({message: 'Build images task complete'}));
});
​
// Task Build
gulp.task('build', ['cleanBuild'], function () {
  gulp.start('buildScripts', 'buildStyles', 'buildImages');
});
​
// Clean
gulp.task('clean', function (cb) {
  return del(['http/dev/js', 'http/dev/css', 'http/dev/img'], cb);
});
​
gulp.task('cleanBuild', function (cb) {
  return del(['http/build/**/*', 'http/build/*', 'http/dist/js', 'http/dist/css', 'http/dist/img'], cb);
});
​
// Default task
gulp.task('default', ['clean'], function () {
  gulp.start('lintScripts', 'scripts', 'styles', 'images', 'watch');
});
​
// Watch
gulp.task('watch', function () {
  // Watch .js files
  gulp.watch('http/js/*.js', ['scripts']);
  gulp.watch('http/js/angular/*.js', ['scripts']);
  gulp.watch('http/js/angular/**/*.js', ['scripts']);
​
  // Watch .scss files
  gulp.watch('http/sass/*.scss', ['styles']);
  gulp.watch('http/sass/**/*.scss', ['styles']);
​
  // Watch image files
  gulp.watch('http/img/*', ['images']);
​
  //// Watch font files
  //gulp.watch('fonts/*', ['images']);
​
  // Create LiveReload server
  livereload.listen();
​
  // Watch any files in dist/, reload on change
  gulp.watch(['http/dev/**']).on('change', livereload.changed);
​
});