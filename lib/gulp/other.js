var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

module.exports = function(config, browsersync) {
    // copy other files as is
    gulp.task('other-gulp', function() {
        // all files except js, scss, sass, less, css
        let otherFiles = [
            config.srcFolder + "/**/*.*",
            "!" + config.srcFolder + "/js/**/*.js",
            "!" + config.srcFolder + "/scss/**/*.scss",
            "!" + config.srcFolder + "/sass/**/*.sass",
            "!" + config.srcFolder + "/less/**/*.less",
            "!" + config.srcFolder + "/css/**/*.css"
        ];

        return gulp.src(otherFiles)
            .pipe(gulp.dest(config.distFolder));
    });

    // processes other files and reload
    gulp.task('other', ['other-gulp'], function() {
        browsersync.reload();
    });
}
