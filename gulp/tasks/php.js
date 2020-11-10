const gulp = require('gulp');

// Копируем все php из папки dev в dist

module.exports = function php() {
  return gulp.src(['dev/static/php/**/*.php', '!' + 'dev/static/php/send.php'])
    .pipe(gulp.dest('dist/static/php'))
};