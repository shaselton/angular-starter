'use strict';

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync').create(),  // https://www.browsersync.io/docs/gulp/
    autoprefixer = require('gulp-autoprefixer'),
    inject = require('gulp-inject'),
    sourcemaps = require('gulp-sourcemaps'),
    wiredep = require('wiredep').stream,
    runSequence = require('run-sequence'),
    del = require('del');

// Styles
gulp.task('styles:development', function() {
  return sass('src/styles/main.scss', { style: 'expanded', sourcemap: true })
    .on('error', function(err){ console.log('Error!', err); })
    .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write('./', {
      includeContent: false,
      sourceRoot: 'src/styles'
    }))
    .pipe(gulp.dest('tmp'))
    .pipe(browserSync.stream({match: 'tmp/*.css'}))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('styles:production', function() {
  return sass('src/styles/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts:development', function() {
  return gulp.src(['src/scripts/**/*.js', 'src/scripts/**/*.html'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('tmp'))
    .pipe(browserSync.stream())
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('scripts:production', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images:development', function() {
  return gulp.src('src/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('tmp/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('images:production', function() {
  return gulp.src('src/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean:development', function() {
  return del(['tmp/*']);
});

gulp.task('clean:production', function() {
  return del(['dist/*']);
});

gulp.task('serve:development', function(){
  runSequence('clean:development',
              ['styles:development', 'scripts:development', 'images:development'],
              'inject:development',
              'browser:development');
});

gulp.task('serve:production', function(){
  runSequence('clean:production',
              ['styles:production', 'scripts:production', 'images:production'],
              'inject:production');
});

gulp.task('browser:development', function(){
  browserSync.instance = browserSync.init({
    startPath: '/tmp',
    server: {
      baseDir: './'
    }
  });

  gulp.watch(["src/**/*.scss", "src/**/*.css"], ['styles:development']);
  gulp.watch(["src/*.html"], ['inject:development']);
  gulp.watch(["src/**/*.js", "src/*.js", "src/scripts/**/*.html"], ['scripts:development']);
  gulp.watch("tmp/index.html").on('change', browserSync.reload);
});

gulp.task('inject:development', function(){
  var injectStyles = gulp.src([
    './tmp/*.css'
  ], {read: false});

  var injectScripts = gulp.src([
    './tmp/**/*.js',
    './tmp/*.js'
  ], {read: false});

  var wiredepOptions = { 
    directory: 'bower_components'
  };

  return gulp.src('src/index.html')
    .pipe(inject(injectStyles))
    .pipe(inject(injectScripts))
    .pipe(wiredep(wiredepOptions))
    .pipe(gulp.dest('tmp/'))
    .pipe(notify({ message: 'Injection Finished' }));
});

gulp.task('inject:production', function(){
  var injectStyles = gulp.src([
    './dist/*.css'
  ], {read: false});

  var injectScripts = gulp.src([
    './dist/**/*.js',
    './dist/*.js'
  ], {read: false});

  var wiredepOptions = { 
    directory: 'bower_components'
  };

  return gulp.src('src/index.html')
    .pipe(inject(injectStyles))
    .pipe(inject(injectScripts))
    .pipe(wiredep(wiredepOptions))
    .pipe(gulp.dest('dist/'))
    .pipe(notify({ message: 'Injection Finished' }));
});