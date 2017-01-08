var gulp = require('gulp');

module.exports = function(config) {
    gulp.task('watch', function() {
        // watch for js
        gulp.watch("**/*.js", { cwd: config.srcFolder + "/js/" }, ["js"]);

        // watch for style files (scss, sass, less, css)
        gulp.watch("**/*.scss", { cwd: config.srcFolder + "/scss/" }, ["style"]);
        gulp.watch("**/*.sass", { cwd: config.srcFolder + "/sass/" }, ["style"]);
        gulp.watch("**/*.less", { cwd: config.srcFolder + "/less/" }, ["style"]);
        gulp.watch("**/*.css", { cwd: config.srcFolder + "/css/" }, ["style"]);

        // theme roller support
        if (config.themeroller.enabled) {
            gulp.watch("**/*.scss", { cwd: config.srcFolder + "/scss/" }, ["themeroller"]);
            gulp.watch("**/*.sass", { cwd: config.srcFolder + "/sass/" }, ["themeroller"]);
            gulp.watch("**/*.less", { cwd: config.srcFolder + "/less/" }, ["themeroller"]);
        }

        // all files except js, scss, sass, less, css
        let otherFiles = [
            "**/*.*",
            "!js/**/*.js",
            "!scss/**/*.scss",
            "!sass/**/*.sass",
            "!less/**/*.less",
            "!css/**/*.css"
        ];
        gulp.watch(otherFiles, { cwd: config.srcFolder }, ["other"]);
    });
}
