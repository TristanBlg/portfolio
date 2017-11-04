var gulp            = require('gulp'),
	cleanCss        = require('gulp-clean-css'),
	sass            = require('gulp-sass'),
	sassLint        = require('gulp-sass-lint'),
	babel           = require('gulp-babel'),
	base64          = require('gulp-base64'),
	eslint          = require('gulp-eslint'),
	rename          = require('gulp-rename'),
	sourcemaps      = require('gulp-sourcemaps'),
	imageMin        = require('gulp-imagemin'),
	uglify          = require('gulp-uglify'),
	runSequence     = require('run-sequence'),
	cache           = require('gulp-cache'),
	autoprefixer    = require('gulp-autoprefixer'),
	del             = require('del'),
	browserSync     = require('browser-sync');

var source = './dev',
	dist = './web';

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: source
		},
	})
})
gulp.task('sass-lint', function(){
	return gulp.src(source+'/scss/**/*.scss')
		.pipe(sassLint())
		.pipe(sassLint.format())
		.pipe(sassLint.failOnError())
})
gulp.task('sass', ['sass-lint'], function(){
	return gulp.src(source+'/scss/main.scss')
		.pipe(sass())
		.pipe(rename({
			basename: 'styles'
		}))
		.pipe(gulp.dest(source+'/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
})
gulp.task('css', ['sass'], function(){
	return gulp.src(source+'/css/styles.css')
		.pipe(cleanCss())
		.pipe(rename({
			basename: 'styles',
			suffix: '.min'
		}))
		.pipe(gulp.dest(dist))
})
gulp.task('eslint', function(){
	return gulp.src(source+'/js/*.js')
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
})
gulp.task('js', ['eslint'], function(){
	return gulp.src(source+'/js/*.js')
		.pipe(babel())
		.pipe(uglify())
		.pipe(rename({
			basename: 'script',
			suffix: '.min'
		}))
		.pipe(gulp.dest(dist))

})

gulp.task('watch', ['browserSync', 'sass'], function(){
	gulp.watch(source+'/scss/**/*.scss', ['sass']);
	gulp.watch(source+'/*.html', browserSync.reload);
	gulp.watch(source+'/js/*.js');
})




