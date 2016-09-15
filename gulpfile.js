'use strict';

var gulp = require('gulp'),
sass = require('gulp-sass'),
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
pump = require('pump'),
minify = require('gulp-minify'),
sourcemaps = require('gulp-sourcemaps'),
concat = require('gulp-concat'),
gutil = require('gulp-util');

const EXPANDED = 'expanded',
NESTED = 'nested',
COMPACT = 'compact',
COMPRESSED = 'compressed';

gulp.task('default', function () {
    return gulp.src('app/src/styles/sass/main.scss')
    .pipe(sass({outputStyle: EXPANDED}).on('error', sass.logError))
    .pipe(gulp.dest('app/src/styles/'));
});

gulp.task('sass', function () {
	return gulp.src('build/stewed.scss')
	.pipe(sass({outputStyle: EXPANDED}).on('error', sass.logError))
	.pipe(gulp.dest('dist/css/'))
	.pipe(gulp.dest('app/src/styles/'));
});

gulp.task('sass:watch', function () {
	gulp.watch('build/stewed.scss', ['sass']);
});

//JAVASCRIPT
gulp.task('jshint', function() {
  return gulp.src('build/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});
gulp.task('js-concat', function () {
    gulp.src('build/components/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('stewed.js'))
    //only uglify if gulp is ran with '--type production'
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'));
});
gulp.task('js', function () {
    return gulp.src('dist/js/stewed.js')
    .pipe(gulp.dest('app/js/'));
});

//Watch for all changes
gulp.task('watch', function () {
    gulp.watch('app/src/styles/sass/main.scss', ['default']);
    gulp.watch('build/stewed.scss', ['sass']);
    gulp.watch('build/**/*.js', ['js-concat']);
    gulp.watch('build/**/*.js', ['js']);
});