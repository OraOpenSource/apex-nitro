'use strict';

const gulp = require('gulp');
const chalk = require('chalk');
const runSequence = require('run-sequence');
const templates = require('../templates/templates');

module.exports = function (config) {
	// Default task: builds your app
	gulp.task('launch', () => {
		// Default task order
		const tasks = ['style', 'other'];

		if (config.js.processor === 'webpack') {
			tasks.unshift('webpack');
		} else {
			tasks.unshift('js');
		}

		// Theme roller support for sass or less files
		if (config.css.language === 'sass' || config.css.language === 'less') {
			tasks.unshift('themeroller');
		}

		// Print the AFEB ascii logo
		console.log(chalk.magenta(templates.asciiAFEB()));
		console.log(chalk.cyan('APEX Front-End Boost is now processing your files...'));

		// Run tasks
		runSequence('clean', tasks, 'browsersync', 'watch', () => {
			console.log(chalk.cyan('...Done!'));
			console.log(chalk.cyan.bold('Now open up your favorite code editor and modify any file in:'));
			console.log(chalk.cyan.bold(config.srcFolder));
			console.log(chalk.cyan.bold('All files in that directory are sync to your APEX app.'));
		});
	});
};
