const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');  // Enable sourcemaps
const uglify = require('gulp-uglify');  // Minify JS
const sass = require('gulp-sass');  // Compile Sass
const minify = require('gulp-csso'); // Minify CSS
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

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
		.pipe(plumber({
			errorHandler: function(err) {
				notify.onError({
					title: "Gulp error in " + err.plugin,
					message: err.toString()
				})(err);
			}
		}))
		.pipe(source('build.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./brewkrew/dest'))
});

gulp.task('sass', function() {
	console.log(`===== Bundling scss: ${new Date().toString()} =====`);

	return gulp.src(SASS_MAIN_FILE)
		.pipe(plumber({
			errorHandler: function(err) {
				notify.onError({
					title: "Gulp error in " + err.plugin,
					message: err.toString()
				})(err);
			}
		}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer('last 2 versions'))
		.pipe(minify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./brewkrew/dest'));
});

gulp.task('watch', ['build', 'sass'], function() {
	gulp.watch(JS_FILES, ['build']);
	return gulp.watch(SASS_FILES, ['sass']);
});

gulp.task('default', ['build', 'sass']);