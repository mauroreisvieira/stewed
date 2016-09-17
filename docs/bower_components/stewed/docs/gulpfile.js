'use strict';

var gulp = require('gulp'),
sass = require('gulp-sass');
var concat = require('gulp-concat');

const EXPANDED = 'expanded',
NESTED = 'nested',
COMPACT = 'compact',
COMPRESSED = 'compressed';

gulp.task('default', function () {
    return gulp.src('assets/css/sass/*.scss')
    .pipe(sass({outputStyle: EXPANDED}).on('error', sass.logError))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('watch', function () {
    gulp.watch('assets/css/sass/*.scss', ['default']);
});


/**
 * HTML FILES
 */
gulp.task('html', function() {
	gulp.src([
	    'views/layout/header.html',
	    'views/home.html', 
	    'views/layout/footer.html'
	])
	.pipe(concat('index.html'))
	.pipe(gulp.dest('.'));

	gulp.src([
	    'views/layout/header.html',
	    'views/helpers/utilities.html', 
	    'views/layout/footer.php'
	])
	.pipe(concat('helpers.html'))
	.pipe(gulp.dest('.'));
});