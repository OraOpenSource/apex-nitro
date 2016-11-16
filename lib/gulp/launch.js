var gulp = require('gulp'),
    chalk = require('chalk'),
    runSequence = require('run-sequence'),
    templates = require('../templates/templates');

module.exports = function(config) {
    // Default task: builds your app
    gulp.task('launch', function() {
        // default task order
        var tasks = ['js', 'style', 'img', 'lib'];

        // theme roller support for sass or less files
        if (config.themeroller.enabled && (config.sass.enabled || config.less.enabled)) {
            tasks.unshift('themeroller');
        }

        // browsersync
        tasks.unshift('browsersync');

        console.log(chalk.magenta(templates.asciiAFEB()));

        // run tasks
        runSequence('clean', tasks, 'watch', function() {
            console.log(chalk.green.bold("APEX Front-End Boost has successfully processed your files."));
            console.log(chalk.cyan.bold("Now open up your favorite code editor and modify any file in"));
            console.log(chalk.bold(config.srcFolder));
            console.log(chalk.cyan.bold("All files in that directory will be pushed to your APEX app."));
        });
    });
}
