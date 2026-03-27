const gulp = require('gulp');
const uglify = require('gulp-uglify');

function compilaJs(){
    return gulp.src('source/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
}
function watchFiles() {
    gulp.watch('src/js/**/*.js', compilaJs)
}

exports.default = gulp.series(compilaJs,watchFiles);
