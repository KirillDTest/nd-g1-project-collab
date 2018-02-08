const gulp = require('gulp');
const image = require('gulp-image');
const jade = require('gulp-jade');
const sass = require('gulp-sass');
const connect = require('gulp-connect');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

    gulp.task('imageGulp', function(){
        gulp.src( ['src/img/*.jpg', 'src/img/*.png'], {cwd:'./'} )
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(image())
        .pipe(gulp.dest('./dest/img'))
        .pipe(connect.reload())
    })

    gulp.task('html', function(){
        gulp.src( './src/**/!(_)*.jade' )
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(jade())
        .pipe(gulp.dest('./dest'))
        .pipe(connect.reload())
    })

    gulp.task('css', function(){
        gulp.src(['./src/style/**/*.scss', './src/style/**/*.sass'])
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest('./dest/style'))
        .pipe(connect.reload())
    })

    gulp.task('watch', function(){
        gulp.watch('src/**/*.jade', {cwd:'./'}, ['html'])
        gulp.watch(['./src/style/**/*.scss', './src/style/**/*.sass'], ['css'])
        gulp.watch(['./src/img/*.jpg', './src/img/*.png'], ['imageGulp'])
    })

    gulp.task('connect', function(){
        connect.server({
            port: 9000,
            livereload: true,
            root: './dest'
        })
    })

   gulp.task('default', ['html', 'css', 'watch', 'connect'])