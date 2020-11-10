const gulp = require('gulp');

module.exports = function sendPhp() {
  return gulp.src('dev/static/php/send.php')
    .pipe(gulp.dest('dist/'))
};