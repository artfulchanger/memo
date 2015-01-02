var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');

var nodemon = require('gulp-nodemon')
var jshint = require('gulp-jshint')

var run = require('gulp-run');

gulp.task('sass', function() {
  gulp.src('public/stylesheets/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('watch', function() {
  gulp.watch('public/stylesheets/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);

gulp.task('lint', function () {
  gulp.src('./**/*.js')
    .pipe(jshint())
})

gulp.task('develop', function () {
    run('mongod --dbpath ./db').exec()
    .pipe(gulp.dest('./db.log'));

  nodemon({ script: 'bin/www', ext: 'html js', ignore: ['ignored.js'] })
    .on('change', ['lint'])
    .on('restart', function () {
      console.log('restarted!')
    })
})

