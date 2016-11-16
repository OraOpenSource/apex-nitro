var gulp = require('gulp');

module.exports = function(config) {
    gulp.task('watch', function() {
        // watch for changes
        gulp.watch('**/' + config.files.js, { cwd: config.paths.src + config.assets.js }, ['js']);
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
        gulp.watch('**/' + config.files.all, { cwd: config.paths.src + config.assets.img }, ['img']);

        // lib
        gulp.watch('**/' + config.files.all, { cwd: config.paths.src + config.assets.lib }, ['lib']);
    });
}
