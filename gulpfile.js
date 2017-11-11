let gulp            = require('gulp'),
	cleancss        = require('gulp-clean-css'),
	sass            = require('gulp-sass'),
	sassLint        = require('gulp-sass-lint'),
	babel           = require('gulp-babel'),
	eslint          = require('gulp-eslint'),
	imagemin        = require('gulp-imagemin'),
	uglify          = require('gulp-uglify'),
	runSequence     = require('run-sequence'),
	autoprefixer    = require('gulp-autoprefixer'),
	del             = require('del'),
	gulpIf          = require('gulp-if'),
	useref          = require('gulp-useref'),
	browserSync     = require('browser-sync');

let source = './dev',
	dist   = './web';

gulp.task('browserSync', () => {
	browserSync({
		server: {
			baseDir: source
		},
	})
})
gulp.task('css:lint', () => 
	gulp.src(source+'/scss/**/*.scss')
		.pipe(sassLint())
		.pipe(sassLint.format())
)
gulp.task('css', ['css:lint'], () =>
	gulp.src(source+'/scss/main.scss')
		.pipe(sass())
		.pipe(gulp.dest(source+'/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
)
gulp.task('js:lint', () =>
	gulp.src(source+'/js/main.js')
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(browserSync.reload({
			stream: true
		}))
)

gulp.task('images', () =>
    gulp.src(source+'/images/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest(dist+'/images'))
)
gulp.task('fonts', () =>
    gulp.src(source+'/fonts/**/*')
        .pipe(gulp.dest(dist+'/fonts'))
)
gulp.task('useref', ['css', 'js:lint'], () => {
	return gulp.src(source+'/index.html')
		.pipe(useref())
		.pipe(gulpIf('*.js', babel()))
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulpIf('*.css', autoprefixer()))
		.pipe(gulpIf('*.css', cleancss()))
		.pipe(gulp.dest(dist))
})
gulp.task('clean', () => 
    del(dist)
)
gulp.task('watch', ['browserSync', 'css'], () => {
	gulp.watch(source+'/scss/**/*.scss', ['css']);
	gulp.watch(source+'/js/*.js', ['js:lint']);
	gulp.watch(source+'/index.html', browserSync.reload);
})
gulp.task('build', callback => {
    runSequence('clean', 
        ['useref', 'images', 'fonts'], 
        callback
    )
})
gulp.task('default', callback => {
    runSequence(['css', 'js:lint', 'browserSync', 'watch'],
        callback
    )
})
