// dependente
const { gulp, watch, src, dest } = require("gulp");
const sass = require("gulp-sass");
const minifyCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const changed = require("gulp-changed");

//paths
var SCSS_src = "./src/Assets/scss/**/*.scss";
var SCSS_dest = "./src/Assets/css";

function compile_scss() {
  return src(SCSS_src)
    .pipe(sass().on("error", sass.logError))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(changed(SCSS_dest))
    .pipe(dest(SCSS_dest));
}

exports.default = function () {
  return watch(SCSS_src, compile_scss);
};
