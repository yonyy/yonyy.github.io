const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');  // Enable sourcemaps
const uglify = require('gulp-uglify');  // Minify JS
const sass = require('gulp-sass');  // Compile Sass
const minifyCSS = require('gulp-csso'); // Minify CSS

const browserify = require('browserify');
const babel = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const SASS_MAIN_FILE = 'brewkrew/src/sass/main.scss';
const SASS_FILES = 'brewkrew/src/**/*.scss';
const JS_FILES = 'brewkrew/src/**/*.js';
const JS_FILE = 'brewkrew/src/index.js'

gulp.task('build', function(watch) {
	const bundler = browserify({ entries: [JS_FILE], debug: true })
	.transform(babel.configure({
		presets: ["env", "react"]
	}));

	console.log(`===== Bundling js: ${new Date().toString()} =====`);

	return bundler.bundle()
		.pipe(source('build.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify())
		.on('error', console.error)
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./brewkrew/dest'))
		.on('error', console.error);
});

gulp.task('sass', function() {
	console.log(`===== Bundling scss: ${new Date().toString()} =====`);

	return gulp.src(SASS_MAIN_FILE)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(minifyCSS())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./brewkrew/dest'));
});

gulp.task('watch', ['build', 'sass'], function() {
	gulp.watch(JS_FILES, ['build']);
	return gulp.watch(SASS_FILES, ['sass']);
});

gulp.task('default', ['build', 'sass']);