'use strict';

var gulp = require('gulp'),
sass = require('gulp-sass'),
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
pump = require('pump'),
minify = require('gulp-minify'),
sourcemaps = require('gulp-sourcemaps'),
concat = require('gulp-concat'),
gutil = require('gulp-util'),
webserver = require('gulp-webserver'),
htmlPartial = require('gulp-html-partial');

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
	return gulp.src('src/sass/stewed.scss')
	.pipe(sass({outputStyle: EXPANDED}).on('error', sass.logError))
	.pipe(gulp.dest('dist/css/'))
    .pipe(gulp.dest('docs/assets/stewed/'));
});

/** JAVASCRIPT **/
gulp.task('jshint', function() {
  return gulp.src('src/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('js', function () {
    gulp.src('src/sass/components/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('stewed.js'))
    //only uglify if gulp is ran with '--type production'
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(gulp.dest('docs/assets/stewed/'));
});

// Task for html comiling
gulp.task('html', function () {
    gulp.src('src/html/**/*.html')
    .pipe(htmlPartial({
      basePath: 'src/html/'
    }))
    .pipe(gulp.dest('docs/'));
    gulp.src('src/html/assets/css/*.css').pipe(gulp.dest('docs/assets/css'));
    gulp.src('src/html/assets/images/**/*').pipe(gulp.dest('docs/assets/images'));
    gulp.src('src/html/assets/fonts/**/*').pipe(gulp.dest('docs/assets/fonts'));
    gulp.src('src/html/assets/ionicons/**/*').pipe(gulp.dest('docs/assets/ionicons'));
    gulp.src('src/html/assets/js/**/*').pipe(gulp.dest('docs/assets/js'));
    gulp.src('src/html/assets/stewed/*.js').pipe(gulp.dest('docs/assets/stewed'));
});

//Watch for all changes
gulp.task('watch', function () {
    gulp.watch('src/**/*.scss', ['sass']);
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('src/**/*.html', ['html']);
});

//Create Dev Server for all changes
gulp.task('serve', function () {
    gulp.watch('src/**/*.scss', ['sass']);
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('src/**/*.html', ['html']);
    var stream = gulp.src('docs').pipe(webserver({
      livereload: true,
      fallback: 'index.html',
      port: 8090,
      directoryListing: {
        enable: true,
        path: 'docs'
      }
    }));
    stream.emit('kill');
});
