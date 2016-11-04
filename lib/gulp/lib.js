var plugins = require('gulp-load-plugins')();

module.exports = function(gulp, config, browsersync) {
    // copy lib files as is
    gulp.task('lib', function() {
        return gulp.src(config.paths.src + config.assets.lib + '**/' + config.files.all)
            .pipe(gulp.dest(config.paths.dist + config.assets.lib));
    });

    // copy lib files as is
    gulp.task('lib-watch', ['lib'], function() {
        browsersync.reload();
    });
}
