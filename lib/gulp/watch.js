var gulp = require('gulp');

module.exports = function(config) {
    // watch for changes
    gulp.task('watch', function() {
        // browsersync support
        var jsWatch = (config.browsersync.enabled ? ['js-browsersync'] : ['js']);
        gulp.watch('**/' + config.files.js, { cwd: config.paths.src + config.assets.js }, jsWatch);
        gulp.watch('**/' + config.files.scss, { cwd: config.paths.src + config.assets.scss }, ['style']);
        gulp.watch('**/' + config.files.sass, { cwd: config.paths.src + config.assets.sass }, ['style']);
        gulp.watch('**/' + config.files.less, { cwd: config.paths.src + config.assets.less }, ['style']);
        gulp.watch('**/' + config.files.css, { cwd: config.paths.src + config.assets.css }, ['style']);

        // theme roller support
        if (config.themeroller.enabled) {
            gulp.watch('**/' + config.files.scss, { cwd: config.paths.src + config.assets.scss }, ['themeroller']);
            gulp.watch('**/' + config.files.sass, { cwd: config.paths.src + config.assets.sass }, ['themeroller']);
            gulp.watch('**/' + config.files.less, { cwd: config.paths.src + config.assets.less }, ['themeroller']);
        }

        // img
        var imgWatch = (config.browsersync.enabled ? ['img-watch'] : ['img']);
        gulp.watch('**/' + config.files.all, { cwd: config.paths.src + config.assets.img }, imgWatch);

        // lib
        var libWatch = (config.browsersync.enabled ? ['lib-watch'] : ['lib']);
        gulp.watch('**/' + config.files.all, { cwd: config.paths.src + config.assets.lib }, libWatch);
    });
}
