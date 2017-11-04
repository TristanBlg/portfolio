let gulp            = require('gulp'),
	cleancss        = require('gulp-clean-css'),
	sass            = require('gulp-sass'),
	sassLint        = require('gulp-sass-lint'),
	babel           = require('gulp-babel'),
	eslint          = require('gulp-eslint'),
	rename          = require('gulp-rename'),
	sourcemaps      = require('gulp-sourcemaps'),
	imagemin        = require('gulp-imagemin'),
	uglify          = require('gulp-uglify'),
	runSequence     = require('run-sequence'),
	autoprefixer    = require('gulp-autoprefixer'),
	del             = require('del'),
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
gulp.task('sass-lint', () => 
	gulp.src(source+'/scss/**/*.scss')
		.pipe(sassLint())
		.pipe(sassLint.format())
)
gulp.task('sass', ['sass-lint'], () =>
	gulp.src(source+'/scss/main.scss')
		.pipe(sass())
		.pipe(rename({
			basename: 'styles'
		}))
		.pipe(gulp.dest(source+'/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
)
gulp.task('css', ['sass'], () =>
	gulp.src(source+'/css/styles.css')
        .pipe(autoprefixer())
		.pipe(cleancss())
		.pipe(rename({
			basename: 'styles',
			suffix: '.min'
		}))
		.pipe(gulp.dest(dist))
)
gulp.task('eslint', () =>
	gulp.src(source+'/js/**/*.js')
		.pipe(eslint())
		.pipe(eslint.format())
)
gulp.task('js', ['eslint'], () =>
	gulp.src(source+'/js/**/*.js')
		.pipe(babel())
		.pipe(uglify())
		.pipe(rename({
			basename: 'script',
			suffix: '.min'
		}))
		.pipe(gulp.dest(dist))
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
gulp.task('clean', () => {
    del(dist);
})
gulp.task('watch', ['browserSync', 'sass'], () => {
	gulp.watch(source+'/scss/**/*.scss', ['sass']);
	gulp.watch(source+'/*.html', browserSync.reload);
	gulp.watch(source+'/js/**/*.js', browserSync.reload);
})
gulp.task('build', callback => {
    runSequence('clean', 
        ['css', 'js', 'images', 'fonts'], 
        callback
    )
})
gulp.task('default', callback => {
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    )
})
