var gulp = require('gulp');
var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');

gulp.task('es6', function() {
    browserify({ debug: true })
        .transform(babelify)
        .require("./es6/tetris.js", { entry: true })
        .bundle()
        .on('error',gutil.log)
        .pipe(source('tetris.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch',function() {
    gulp.watch(['./app/**/*.js'],['es6'])
});

gulp.task('default', ['es6']);