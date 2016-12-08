var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

module.exports = function(config, browsersync) {
    // copy img files as is
    gulp.task('img-gulp', function() {
        return gulp.src(config.paths.src + config.assets.img + '**/' + config.files.all)
            .pipe(gulp.dest(config.paths.dist + config.assets.img));
    });

    // watch for img changes
    gulp.task('img', ['img-gulp'], function() {
        browsersync.reload();
    });
}
