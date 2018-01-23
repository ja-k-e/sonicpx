const autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  env = require('gulp-env'),
  gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify'),
  util = require('gulp-util'),
  webpack = require('webpack'),
  webpackStream = require('webpack-stream'),
  webserver = require('gulp-webserver');

const settings = {
  autoprefixer: {
    browsers: ['last 2 versions'],
    cascade: false
  },
  cleanCSS: { compatibility: 'ie8' },
  dest: {
    dev: 'dev',
    prod: 'docs'
  },
  env: {
    dev: {
      vars: {
        NODE_ENV: 'development'
      }
    },
    prod: {
      vars: {
        NODE_ENV: 'production'
      }
    }
  },
  webserver: {
    livereload: {
      enable: true,
      filter: p =>
        !!p.match(/(dev\/app\.css)|(dev\/app\.js)|(dev\/index\.html)/)
    },
    host: '0.0.0.0',
    directoryListing: false,
    open: false
  }
};

const globs = {
  css: {
    watch: `${settings.dest.dev}/src/**/*.scss`
  },
  copy: [`${settings.dest.dev}/index.html`, `${settings.dest.dev}/*.png`],
  js: {
    src: `${settings.dest.dev}/src/app.js`,
    watch: `${settings.dest.dev}/src/**/*.js`
  }
};

gulp.task('publish', () => {
  env(settings.env.prod);
  gulp
    .src(globs.js.src)
    .pipe(webpackStream(require('./webpack.config.js')), webpack)
    .pipe(uglify())
    .pipe(gulp.dest(settings.dest.prod));

  gulp
    .src(globs.css.watch)
    .pipe(sass())
    .pipe(autoprefixer(settings.autoprefixer))
    .pipe(cleanCSS(settings.cleanCSS))
    .pipe(gulp.dest(settings.dest.prod));

  globs.copy.forEach(item => {
    if (typeof item === 'string')
      gulp.src(item).pipe(gulp.dest(settings.dest.prod));
    else gulp.src(item.path).pipe(gulp.dest(settings.dest.prod + item.dest));
  });
});

gulp.task('default', () => {
  gulp.watch(globs.js.watch, ['dev:js']);
  gulp.watch(globs.css.watch, ['dev:css']);
  gulp.src(settings.dest.dev).pipe(webserver(settings.webserver));
});

gulp.task('dev:js', () => {
  env(settings.env.dev);
  gulp
    .src(globs.js.src)
    .pipe(plumber())
    .pipe(webpackStream(require('./webpack.config.js')), webpack)
    .pipe(gulp.dest(settings.dest.dev));
});

gulp.task('dev:css', () => {
  gulp
    .src(globs.css.watch)
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer(settings.autoprefixer))
    .pipe(cleanCSS(settings.cleanCSS))
    .pipe(gulp.dest(settings.dest.dev));
});
