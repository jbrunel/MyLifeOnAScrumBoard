var Promise = require("es6-promise").Promise;

var gulp = require("gulp"),
    connect = require("gulp-connect"),
    sass = require("gulp-sass"),
    inject = require("gulp-inject"),
    concat = require("gulp-concat"),
    streamqueue = require("streamqueue"),
    templateCache = require("gulp-angular-templatecache"),
    cssnano = require("gulp-cssnano"),
    uglify = require("gulp-uglify"),
    sourcemaps = require("gulp-sourcemaps");

var BOWER_PATH = "./bower_components/";

gulp.task("connect", function() {
  connect.server({
    root: "dist",
    livereload: true
  });
});

gulp.task("html", function() {
  var sources = gulp.src([
      "./dist/css/*.css",
      "./dist/js/*.js"
    ]);
  gulp.src("./app/index.html")
    .pipe(inject(sources, {
      ignorePath: "dist/",
      addRootSlash: false
    }))
    .pipe(gulp.dest("./dist/"))
    .pipe(connect.reload());
});

gulp.task("js", function() {
  var js = [
    BOWER_PATH + "angular/angular.min.js",
    "./app/*.js"
  ];

  var jsStream = gulp.src(js);

  var templateStream = gulp.src("./app/templates/*.html")
    .pipe(templateCache({standalone:true}));

  return streamqueue({objectMode: true}, jsStream, templateStream)
    .pipe(concat("app.js"))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write(".", {includeContent: true, sourceMappingURLPrefix: "/js"}))
    .pipe(gulp.dest("./dist/js"))
    .pipe(connect.reload());
});

gulp.task("css", function() {
  return gulp.src("./app/*.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(concat("app.css"))
    .pipe(sourcemaps.init())
    .pipe(cssnano())
    .pipe(sourcemaps.write(".", {includeContent: true, sourceMappingURLPrefix: "/css"}))
    .pipe(gulp.dest("./dist/css"))
    .pipe(connect.reload());
});

gulp.task("img", function() {
  return gulp.src("./app/img/*.+(jpg|png)")
    .pipe(gulp.dest("./dist/img"))
    .pipe(connect.reload());
});

gulp.task("watch", function() {
  gulp.watch(["./app/*.html"], ["html"]);
  gulp.watch(["./app/*.js", "./app/templates/*.html"], ["js", "html"]);
  gulp.watch(["./app/*.scss"], ["css", "html"]);
  gulp.watch(["./app/img/*.+(jpg|png)"], ["img", "css", "html"]);
});

gulp.task("default", ["connect", "watch", "img", "js", "css", "html"]);
gulp.task("test", ["img", "js", "css", "html"]);
