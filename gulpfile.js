var gulp = require("gulp"),
    connect = require("gulp-connect"),
    sass = require("gulp-sass"),
    inject = require("gulp-inject");

gulp.task("connect", function() {
  connect.server({
    livereload: true
  });
});

gulp.task("html", function() {
  var sources = gulp.src(["./dist/css/*.css", "./dist/js/*.js"]);
  gulp.src("./app/index.html")
    .pipe(inject(sources))
    .pipe(gulp.dest("./dist/"))
    .pipe(connect.reload());
});

gulp.task("css", function() {
  gulp.src("./app/**/*.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(gulp.dest("./dist/css"))
    .pipe(connect.reload());
});

gulp.task("watch", function() {
  gulp.watch(["./app/*.html"], ["html"]);
  gulp.watch(["./app/*.scss"], ["css", "html"]);
});

gulp.task("default", ["connect", "css", "html", "watch"]);
