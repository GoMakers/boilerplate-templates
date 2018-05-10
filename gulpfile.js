'use strict'

var gulp = require('gulp');
var browserSync = require('browser-sync');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var map = require('map-stream');
var rename = require('gulp-rename');
var sourceMaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

var inputFiles = {
  scss: 'src/sass/**/*',
  html: 'src/pages/**/*'
};

var outputFiles = {
  dist: 'dist/',
  css: 'dist/css'
};

// Clear folder dist

gulp.task('clean', function () {
  return gulp.src('dist/')
    .pipe(clean());
});

// compiler css with Sass

gulp.task('css', function () {
  gulp.src('src/sass/**/*.scss')
    .pipe(sourceMaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// compiles html

gulp.task('minify', function () {
  return gulp.src('src/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// browserSync

gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: 'dist/'
    }
  })
});

// Watch files

gulp.task('watch', ['clean', 'browserSync', 'css', 'minify'], function () {
  gulp.watch('src/sass/**/*.scss', ['css']);
  gulp.watch('src/**/*.html', ['minify']);
  gulp.watch('src/**/*.html', browserSync.reload);
});
