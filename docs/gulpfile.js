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
 		'views/layout/footer.html'
 		])
 	.pipe(concat('helpers.html'))
 	.pipe(gulp.dest('.'));

 	gulp.src([
 		'views/layout/header.html',
 		'views/components.html', 
 		'views/components/badges.html', 
 		'views/layout/footer.html'
 		])
 	.pipe(concat('badges.html'))
 	.pipe(gulp.dest('.'));

 	gulp.src([
 		'views/layout/header.html',
 		'views/components.html', 
 		'views/components/breadcrumbs.html', 
 		'views/layout/footer.html'
 		])
 	.pipe(concat('breadcrumbs.html'))
 	.pipe(gulp.dest('.'));

 	gulp.src([
 		'views/layout/header.html',
 		'views/components.html', 
 		'views/components/buttons.html', 
 		'views/layout/footer.html'
 		])
 	.pipe(concat('buttons.html'))
 	.pipe(gulp.dest('.'));

 	gulp.src([
 		'views/layout/header.html',
 		'views/components.html', 
 		'views/components/cards.html', 
 		'views/layout/footer.html'
 		])
 	.pipe(concat('cards.html'))
 	.pipe(gulp.dest('.'));

 	gulp.src([
 		'views/layout/header.html',
 		'views/components.html', 
 		'views/components/forms.html', 
 		'views/layout/footer.html'
 		])
 	.pipe(concat('forms.html'))
 	.pipe(gulp.dest('.'));

 	gulp.src([
 		'views/layout/header.html',
 		'views/components.html', 
 		'views/components/grid.html', 
 		'views/layout/footer.html'
 		])
 	.pipe(concat('grid.html'))
 	.pipe(gulp.dest('.'));

 	gulp.src([
 		'views/layout/header.html',
 		'views/components.html', 
 		'views/components/navigation.html', 
 		'views/layout/footer.html'
 		])
 	.pipe(concat('navigation.html'))
 	.pipe(gulp.dest('.'));

 	gulp.src([
 		'views/layout/header.html',
 		'views/components.html', 
 		'views/components/pagination.html', 
 		'views/layout/footer.html'
 		])
 	.pipe(concat('pagination.html'))
 	.pipe(gulp.dest('.'));

 	gulp.src([
 		'views/layout/header.html',
 		'views/components.html', 
 		'views/components/tables.html', 
 		'views/layout/footer.html'
 		])
 	.pipe(concat('tables.html'))
 	.pipe(gulp.dest('.'));

 	gulp.src([
 		'views/layout/header.html',
 		'views/javascript.html', 
 		'views/javascript/accordion.html', 
 		'views/layout/footer.html'
 		])
 	.pipe(concat('accordion.html'))
 	.pipe(gulp.dest('.'));

 	gulp.src([
 		'views/layout/header.html',
 		'views/javascript.html', 
 		'views/javascript/dropdown.html', 
 		'views/layout/footer.html'
 		])
 	.pipe(concat('dropdown.html'))
 	.pipe(gulp.dest('.'));

 	gulp.src([
 		'views/layout/header.html',
 		'views/javascript.html', 
 		'views/javascript/modal.html', 
 		'views/layout/footer.html'
 		])
 	.pipe(concat('modal.html'))
 	.pipe(gulp.dest('.'));

 	gulp.src([
 		'views/layout/header.html',
 		'views/javascript.html', 
 		'views/javascript/sidenav.html', 
 		'views/layout/footer.html'
 		])
 	.pipe(concat('sidenav.html'))
 	.pipe(gulp.dest('.'));

 	gulp.src([
 		'views/layout/header.html',
 		'views/javascript.html', 
 		'views/javascript/snackbar.html', 
 		'views/layout/footer.html'
 		])
 	.pipe(concat('snackbar.html'))
 	.pipe(gulp.dest('.'));	

 	gulp.src([
 		'views/layout/header.html',
 		'views/javascript.html', 
 		'views/javascript/tabs.html', 
 		'views/layout/footer.html'
 		])
 	.pipe(concat('tabs.html'))
 	.pipe(gulp.dest('.'));

 	gulp.src([
 		'views/layout/header.html',
 		'views/javascript.html', 
 		'views/javascript/tooltips.html', 
 		'views/layout/footer.html'
 		])
 	.pipe(concat('tooltips.html'))
 	.pipe(gulp.dest('.'));
 });