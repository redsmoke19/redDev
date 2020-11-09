const gulp = require('gulp');

// Копируем все php из папки dev в dist

module.exports = function php() {
  return gulp.src('dev/static/php/**/*.*')
    .pipe(gulp.dest('dist/static/php'))
};