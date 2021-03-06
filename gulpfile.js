var gulp        = require('gulp'),
	sass 		= require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat 		= require('gulp-concat'),
	uglify 		= require('gulp-uglifyjs'),
	cssnano  	= require('gulp-cssnano'),
	rename		= require('gulp-rename'),
	jade		= require('gulp-jade'),
	del			= require('del'),
	imagemin	= require('gulp-imagemin'),
	pngquant	= require('imagemin-pngquant'),
	cache		= require('gulp-cache'),
	autoprefixer= require('gulp-autoprefixer'),
	plumber		= require('gulp-plumber'),
	nodemon 	= require('gulp-nodemon');


gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer([ 'last 15 versions', '> 1%', 'ie 8', 'ie 7' ], { cascade: true }))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('jade', function() {
	return gulp.src(['app/views/main/*.jade'])
		.pipe(plumber())
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('app'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: 'http:\/\/localhost:9999',
		notify: false 
	});
});

gulp.task('nodemon', function (cb) {
    var callbackCalled = false;
    return nodemon({script: './server.js'}).on('start', function () {
        if (!callbackCalled) {
            callbackCalled = true;
            cb();
        }
    });
});

gulp.task('scripts', function() {
	return gulp.src([
			'app/libs/jquery/dist/jquery.min.js'
			])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
});

gulp.task('css-libs',['sass'], function() {
	return gulp.src(['app/css/libs.css'])
		.pipe(plumber())
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css'))
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('clean-app', function() {
	return del.sync('app/css');
})

gulp.task('clear', function() {
	return cache.clearAll();
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			use: [ pngquant() ]
		})))
		.pipe(gulp.dest('dist/img'))
});

gulp.task('watch', ['browser-sync', 'css-libs', 'jade', 'scripts'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/jade/**/*.jade', ['jade']);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('default', ['watch']);

gulp.task('build', [ 'clean', 'img', 'sass', 'jade', 'scripts' ], function() {

	var buildCss = gulp.src([
		'app/css/main.css',
		'app/css/libs.min.css'
	])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'))

	var buildFav = gulp.src('app/favicon.ico')
		.pipe(gulp.dest('dist'))

});