var plugins = require('gulp-load-plugins')();

module.exports = function(gulp, config, browsersync) {
    // copy img files as is
    gulp.task('img', function() {
        return gulp.src(config.paths.src + config.assets.img + '**/' + config.files.all)
            .pipe(plugins.if(config.imageOptimization.enabled, plugins.imagemin()))
            .pipe(gulp.dest(config.paths.dist + config.assets.img));
    });

    // watch for img changes
    gulp.task('img-watch', ['img'], function() {
        browsersync.reload();
    });
}
