const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    concat      = require('gulp-concat'),
    connectPHP  = require('gulp-connect-php'),
    cssnano     = require('gulp-cssnano'),
    uglify      = require('gulp-uglifyjs'),
    del         = require('del')
    autoprefixer = require('gulp-autoprefixer');

const paths = {
    html: ['public/*.php'],
    sass: ['assets/sass/**/*'],
    js: ['assets/js/**/*.js']
}

const vendor = {
    css: [
        'libs/bootstrap/dist/css/bootstrap.min.css'
    ],
    js: [
        'libs/jquery/dist/jquery.min.js',
        'libs/bootstrap/dist/js/bootstrap.min.js'
    ]
}

gulp.task('build', ['clean', 'vendor:css', 'vendor:js', 'assets:sass', 'assets:js'])

gulp.task('watch', ['build'], function() {
    gulp.watch(paths.sass, ['assets:sass']);
    gulp.watch(paths.js, ['assets:js']);
    gulp.watch(paths.html, ['html']);
});

gulp.task('live', ['php', 'browser-sync', 'watch']);

gulp.task('html', function() {
    return gulp.src(paths.html)
        .pipe(reload({stream: true}))
})

gulp.task('assets:sass', function () {
    return gulp.src('assets/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('public/css'))
        .pipe(reload({stream: true}));
});

gulp.task('assets:js', function() {
    return gulp.src('assets/js/*.js')
        .pipe(gulp.dest('public/js'))
        .pipe(reload({stream: true}));
});

gulp.task('vendor:js', function() {
    return gulp.src(vendor.js)
        .pipe(concat('vendor.min.js'))
	    .pipe(uglify())
	    .pipe(gulp.dest('public/js'));
});

gulp.task('vendor:css', function() {
    return gulp.src(vendor.css)
        .pipe(concat('vendor.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('public/css'));
});

gulp.task('clean', function() {
    return del.sync([
        'public/js/*',
        'public/css/*'
    ]);
});

gulp.task('browser-sync', function() {
    browserSync({
        proxy: '127.0.0.1:8888'
    });
});

gulp.task('php', function(){
  connectPHP.server({ base: 'public', keepalive:true, hostname: 'localhost', port:8888, open: false});
});

gulp.task('default', ['build'])
