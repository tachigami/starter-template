'use strict';

const gulp = require('gulp');
const path = require('path');
const _if = require('gulp-if');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const del = require('del');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const jpegoptim = require('imagemin-jpegoptim');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const fileinclude = require('gulp-file-include');
const changed = require('gulp-changed');
const merge = require('merge-stream');

const server = browserSync.create();
const options = require('./options');
const libs = require('./libs');
var generateSourcemaps = true;

const paths = {
  sass: {
    src: options.srcDir + '/sass',
    dest: options.destDir + '/css',
    mask: '/*.+(sass|scss)',
  },
  js: {
    src: options.srcDir + '/js',
    dest: options.destDir + '/js',
    mask: '/*.js',
  },
  img: {
    src: options.srcDir + '/img',
    dest: options.destDir + '/img',
    mask: '/**/*.+(png|jpg|jpeg|gif|svg)',
  },
  html: {
    src: options.srcDir + '/templates',
    dest: options.destDir + '/',
    mask: '/**/[^_]*.+(html|php)',
  },
  fonts: {
    src: options.srcDir + '/fonts',
    dest: options.destDir + '/fonts',
    mask: '/**/*.*',
  },
  watch: {
    sass: options.srcDir + '/sass/**/*.+(sass|scss)',
    js: options.srcDir + '/js/**/*.js',
    img: options.srcDir + '/img/**/*.+(png|jpg|jpeg|gif|svg)',
    html: options.srcDir + '/**/*.+(html|php)',
    fonts: options.srcDir + '/fonts/**/*',
  },
  vendor: {
    css: 'vendor.min.css',
    js: 'vendor.min.js',
  },
};

function reload(done) {
  server.reload();
  done();
}

function handleError(err) {
  notify({
    title: 'Gulp Task Error',
    message: '!!!ERROR!!! Check the console.',
  }).write(err);
  console.log(err.toString());
  this.emit('end');
}

function handleWatchEvent(event, filePath, description) {
  var filePathFromSrc = path.relative(path.resolve(filePath.src), event);
  var destFilePath = path.resolve(filePath.dest, filePathFromSrc);
  console.log('Deleting: ' + destFilePath);
  del.sync(destFilePath, {force: true});
  if (options.notifications) {
    notify({
      title: 'Gulp Task Complete',
      message: description + ' has been compiled',
    }).write('');
  }
}

function sync(done) {
  var params = {
    scrollThrottle: 100,
    scrollProportionally: false,
    injectChanges: true,
    notify: options.notifications,
    open: options.openBrowser,
  };

  if (!options.enableIntegration) {
    params.server = {
      baseDir: options.destDir,
    };
  } else {
    params.proxy = options.proxyHost;
  }

  server.init(params);

  done();
}

function setProduction(done) {
  generateSourcemaps = false;
  done();
}

function html(done) {
  if (!options.enableIntegration) {
    return gulp.src(paths.html.src + paths.html.mask)
      .pipe(plumber({ errorHandle: handleError }))
      .pipe(fileinclude())
      .pipe(gulp.dest(paths.html.dest))
      .pipe(browserSync.stream({ once: true }));
  }
  done();
}

function styles() {
  return gulp.src(paths.sass.src + paths.sass.mask)
    .pipe(plumber({ errorHandle: handleError }))
    .pipe(_if(generateSourcemaps, sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer([
      '>1%',
      'not ie 11',
      'not op_mini all',
    ]))
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(_if(generateSourcemaps, sourcemaps.write('.')))
    .pipe(gulp.dest(paths.sass.dest))
    .pipe(browserSync.stream({ once: true }));
}

function scripts() {
  return gulp.src(paths.js.src + paths.js.mask)
    .pipe(plumber({ errorHandle: handleError }))
    .pipe(_if(generateSourcemaps, sourcemaps.init()))
    .pipe(fileinclude())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(_if(generateSourcemaps, sourcemaps.write('.')))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.stream({ once: true }));
}

function images() {
  return gulp.src(paths.img.src + paths.img.mask)
    .pipe(plumber({ errorHandle: handleError }))
    .pipe(changed(paths.img.dest))
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      jpegoptim(options.jpeg),
      _if(options.png.lossless, imagemin.optipng(options.png.optipng), pngquant(options.png.pngquant)),
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { removeUnknownsAndDefaults: { unknownAttrs: false } },
          { cleanupIDs: false },
          { collapseGroups: false },
        ],
      }),
    ], {
      verbose: true,
    }))
    .pipe(gulp.dest(paths.img.dest))
    .pipe(browserSync.stream({ once: true }));
}

function fonts() {
  return gulp.src(paths.fonts.src + paths.fonts.mask)
    .pipe(gulp.dest(paths.fonts.dest));
}

function vendorScripts(cb) {
  if (libs.scripts.length <= 0) {
    return cb();
  }
  return gulp.src(libs.scripts)
    .pipe(plumber({ errorHandle: handleError }))
    .pipe(concat(paths.vendor.js))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest));
}

function vendorStyles(cb) {
  var stream = merge();
  if (libs.styles.sass.length > 0) {
    stream.add(gulp.src(libs.styles.sass).pipe(sass()));
  }
  if (libs.styles.css.length > 0) {
    stream.add(gulp.src(libs.styles.css));
  }

  if (stream.isEmpty()) {
    return cb();
  }

  return stream
    .pipe(plumber({ errorHandle: handleError }))
    .pipe(concat(paths.vendor.css))
    .pipe(autoprefixer([
      '>1%',
      'not ie 11',
      'not op_mini all',
    ]))
    .pipe(cleanCss())
    .pipe(gulp.dest(paths.sass.dest));
}

function clean(done) {
  if (!options.enableIntegration) {
    del.sync([options.destDir + '/**/*', '!' + options.destDir + '/.gitkeep'],
      { dot: true });
  } else {
    del.sync([
      paths.js.dest,
      paths.sass.dest,
      paths.img.dest,
      paths.fonts.dest,
    ], {force: true});
  }
  done();
}

function runWatch() {
  gulp.watch(paths.watch.sass, { usePolling: true },
    gulp.series(styles, reload))
    .on('unlink', function(event) {
      handleWatchEvent(event, paths.sass, 'SASS');
    });
  gulp.watch(paths.watch.js, { usePolling: true }, gulp.series(scripts, reload))
    .on('unlink', function(event) {
      handleWatchEvent(event, paths.js, 'JS');
    });
  gulp.watch(paths.watch.img, { usePolling: true }, gulp.series(images, reload))
    .on('unlink', function(event) {
      handleWatchEvent(event, paths.img, 'IMG');
    });
  gulp.watch(paths.watch.fonts, { usePolling: true },
    gulp.series(images, reload)).on('unlink', function(event) {
    handleWatchEvent(event, paths.fonts, 'FONTS');
  });
  if (!options.enableIntegration) {
    gulp.watch(paths.watch.html, { usePolling: true },
      gulp.series(html, reload))
      .on('unlink', function(event) {
        handleWatchEvent(event, paths.html, 'HTML');
      });
  }
}

const assets = gulp.parallel(html, styles, scripts, images, fonts);

const vendor = gulp.parallel(vendorScripts, vendorStyles);

const build = gulp.series(clean, gulp.parallel(assets, vendor));

const watch = gulp.parallel(build, runWatch);

const live = gulp.series(sync, watch);

const production = gulp.series(setProduction, build);

gulp.task('assets', assets);

gulp.task('html', html);

gulp.task('styles', styles);

gulp.task('scripts', scripts);

gulp.task('images', images);

gulp.task('fonts', fonts);

gulp.task('vendor', vendor);

gulp.task('watch', watch);

gulp.task('live', live);

gulp.task('default', production);
