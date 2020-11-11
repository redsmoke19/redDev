const gulp = require('gulp');

// Копируем все php из папки dev в dist

module.exports = function files() {
  return gulp.src('dev/static/files/**/*.*')
    .pipe(gulp.dest('dist/static/files'))
};