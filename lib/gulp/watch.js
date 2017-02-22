var gulp = require('gulp');

module.exports = function(config) {
    gulp.task('watch', function() {
        // watch for js
        gulp.watch("**/*.js", { cwd: config.srcFolder + "/js/" }, ["js"]);

        // watch for style files (scss, sass, less, css)
        // activates theme roller for (scss, sass, less)
        gulp.watch("**/*.scss", { cwd: config.srcFolder + "/scss/" }, ["style", "themeroller"]);
        gulp.watch("**/*.sass", { cwd: config.srcFolder + "/sass/" }, ["style", "themeroller"]);
        gulp.watch("**/*.less", { cwd: config.srcFolder + "/less/" }, ["style", "themeroller"]);
        gulp.watch("**/*.css", { cwd: config.srcFolder + "/css/" }, ["style"]);

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
