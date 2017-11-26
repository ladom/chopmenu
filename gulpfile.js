var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var babel = require("gulp-babel");
var concat = require("gulp-concat");


gulp.task('serve', ['sass', 'js'], function() {
    browserSync.init({
        server: "./src/"
    });

    gulp.watch("./src/css/*.scss", ['sass']);
    gulp.watch("./src/scripts/*.js", ['js']);
    gulp.watch("src/index.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("./src/css/jquery.chopmenu.scss")
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['ie >= 11', 'last 10 versions']
        }))
        .pipe(gulp.dest("./src/"))
        .pipe(browserSync.stream());
});

gulp.task("js", function() {
    return gulp.src(['./src/scripts/chopmenu.js'])

    .pipe(concat('jquery.chopmenu.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest("./src/"))
        .pipe(browserSync.stream());
});


gulp.task('default', ['serve']);