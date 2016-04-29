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
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    inject = require('gulp-inject'),
    del = require('del');

// Styles
gulp.task('styles', function() {
  return sass('src/styles/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/assets/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function() {
  return del(['dist/assets/styles', 'dist/assets/scripts', 'dist/assets/images']);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images');
});

function browserSyncInit(baseDir, files){
  browserSync.instance = browserSync.init(files, {
    startPath: '/',
    server: {
      baseDir: baseDir
    }
  });
}

gulp.task('serve', ['inject'], function(){
    browserSyncInit( ['tmp', 'src'], ['tmp/**/*.css'] );
  }
);

gulp.task('inject', function(){
  
  var injectStyles = gulp.src([
    'tmp/**/*.css'
  ], {read: false});

});