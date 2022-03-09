// get all variable
const gulp = require("gulp"),
  autoprefixer = require("gulp-autoprefixer"),
  concat = require("gulp-concat"),
  minify = require("gulp-uglify"),
  sass = require("gulp-sass")(require("sass")),
  sourcemaps = require("gulp-sourcemaps"),
  zip = require("gulp-zip");

// ----------------- task css -----------------
gulp.task("css", () => {
  return gulp
    .src(["./project/css/**/*.css", "./project/css/**/*.scss"])
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer("last 2 versions"))
    .pipe(concat("main.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./docs/css"));
});

// ----------------- task js -----------------
gulp.task("js", () => {
  return gulp
    .src(["./project/javascript/*.js"])
    .pipe(concat("main.js"))
    .pipe(minify())
    .pipe(gulp.dest("./docs/javaScript"));
});

gulp.task("watch", () => {
  gulp.watch(
    ["./project/css/**/*.scss", "./project/css/**/*.scss"],
    gulp.series("css")
  );
  gulp.watch(["./project/javascript/*.js"], gulp.series("js"));
});
