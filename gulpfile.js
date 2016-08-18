'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass');

const EXPANDED = 'expanded',
	NESTED = 'nested',
	COMPACT = 'compact',
	COMPRESSED = 'compressed';

gulp.task('sass', function () {
	return gulp.src('build/stewed.scss')
	.pipe(sass({outputStyle: EXPANDED}).on('error', sass.logError))
	.pipe(gulp.dest('dist/css/'))
	.pipe(gulp.dest('app/styles/'));
});

gulp.task('sass:watch', function () {
	gulp.watch('build/stewed.scss', ['sass']);
});