const gulp = require('gulp');
const sass = require('gulp-sass');
const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');
const pump = require('pump');
const minify = require('gulp-minify');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const webserver = require('gulp-webserver');
const htmlPartial = require('gulp-html-partial');
const htmlreplace = require('gulp-html-replace');
const packageJson = require('./package.json');

const EXPANDED = 'expanded',
    NESTED = 'nested',
    COMPACT = 'compact',
    COMPRESSED = 'compressed';

gulp.task('default', function () {
    return gulp.src('app/src/styles/scss/*.scss')
    .pipe(sass({outputStyle: EXPANDED}).on('error', sass.logError))
    .pipe(gulp.dest('app/src/styles/'));
});

gulp.task('sass', function () {
    return gulp.src('src/scss/*.scss')
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
    gulp.src('src/scss/components/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('stewed.js'))
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
    .pipe(htmlreplace({
      version: {
        src: packageJson.version,
        tpl: 'v%s'
      }
    }))
    .pipe(gulp.dest('docs/'));
    gulp.src('src/html/assets/images/**/*').pipe(gulp.dest('docs/assets/images'));
    gulp.src('src/html/assets/fonts/**/*').pipe(gulp.dest('docs/assets/fonts'));
    gulp.src('src/html/assets/scss/*.scss')
        .pipe(sass({outputStyle: EXPANDED}).on('error', sass.logError))
        .pipe(gulp.dest('docs/assets/css'));
});

// Watch for all changes
gulp.task('watch', function () {
    gulp.watch('src/**/*.scss', ['sass']);
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('src/**/*.html', ['html']);
});

// Create Dev Server for all changes
gulp.task('serve', function () {
    gulp.watch('app/src/styles/scss/*.scss', ['default']);
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
