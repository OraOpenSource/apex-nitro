'use strict';

const gulp = require('gulp');
const chalk = require('chalk');
const runSequence = require('run-sequence');
const templates = require('../templates/templates');

module.exports = function (config) {
	// Default task: builds your app
	gulp.task('launch', () => {
		// Default task order
		const tasks = ['js', 'style', 'other'];

		// Theme roller support for sass or less files
		if (config.sass.enabled || config.less.enabled) {
			tasks.unshift('themeroller');
		}

		// Print the AFEB ascii logo
		console.log(chalk.magenta(templates.asciiAFEB()));

		// Run tasks
		runSequence('clean', tasks, 'browsersync', 'watch', () => {
			console.log(chalk.green.bold('APEX Front-End Boost has successfully processed your files.'));
			console.log(chalk.cyan.bold('Now open up your favorite code editor and modify any file in:'));
			console.log(chalk.cyan.bold(config.srcFolder));
			console.log(chalk.cyan.bold('All files in that directory will be pushed to your APEX app.'));
		});
	});
};
