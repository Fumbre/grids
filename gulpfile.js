const {src, dest, series, watch} = require('gulp')
const concat = require('gulp-concat')
const pug = require('gulp-pug')
const sass = require('gulp-sass')(require('sass'))
const cleanCSS = require('gulp-clean-css')
const notify = require('gulp-notify')
const svgSprite = require('gulp-svg-sprite')
const uglify = require('gulp-uglify-es').default
const sourcemaps = require('gulp-sourcemaps')
const environments = require('gulp-environments')
const babel = require('gulp-babel')
const del = require('del')
const browserSync = require('browser-sync').create()

const dev = environments.development;
const prod = environments.production;

const srcFolder = 'src';
const distFolder = 'dist';

const path = {
  srcSvg: `${srcFolder}/img/svg/**/*.svg`,
  srcSass: `${srcFolder}/styles/*.sass`,
  srcPug: `${srcFolder}/html/**/*.pug`,
  srcJs: `${srcFolder}/js/**/*.js`,
  srcImg: [`${srcFolder}/img/**/*.webp`, `${srcFolder}/img/**/*.ico`],
  distImg: `${distFolder}/images`,
  dist: `${distFolder}`
}

const clean = () => {
  return del([path.dist])
}

const mode = (dev) => {
  return dev.task
}

const html = () => {
  return src(path.srcPug)
    .pipe(dev(sourcemaps.init()))
    .pipe(pug())
    .pipe(dev(sourcemaps.write()))
    .pipe(dest(path.dist))
    .pipe(browserSync.stream())
}

const styles = () => {
  return src(path.srcSass)
    .pipe(dev(sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(prod(cleanCSS({
      level: 2
    })))
    .pipe(dev(sourcemaps.write()))
    .pipe(dest(path.dist))
    .pipe(browserSync.stream())
}

const scripts = () => {
  return src(path.srcJs)
    .pipe(dev(sourcemaps.init()))
    .pipe(concat('main.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify().on('error', notify.onError()))
    .pipe(dev(sourcemaps.write()))
    .pipe(dest(path.dist))
    .pipe(browserSync.stream())
}

const sprites = () => {
  return src(path.srcSvg)
    .pipe(svgSprite({
      mode: {
        stack: {
            sprite: "../sprite.svg"
        }
       }
    }))
    .pipe(dest(path.distImg))
}

const images = () => {
  return src(path.srcImg)
    .pipe(dest(path.distImg))
    .pipe(browserSync.stream())
}

const fonts = () => {
  return src(`${srcFolder}/fonts/*`)
    .pipe(dest(`${distFolder}/fonts`))
}

const watchFile = () => {
  browserSync.init({
    server: {
        baseDir: 'dist'
    }
  })
}

dev(watch(path.srcPug, html))
dev(watch(path.srcSass, styles))
dev(watch(path.srcJs, scripts))
dev(watch(path.srcImg, images))
dev(watch('src/img/svg/**/*.svg', sprites))

exports.default = series (clean, mode(dev), html, styles, scripts, sprites, images, fonts, watchFile);
exports.build = series (clean, mode(prod), html, styles, scripts, sprites, images, fonts, watchFile);
