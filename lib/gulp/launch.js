'use strict';

const gulp = require('gulp');
const chalk = require('chalk');
const runSequence = require('run-sequence');
const templates = require('../templates/templates');

module.exports = function (config, cb) {
	// No operation task (do nothing...)
	gulp.task('noop', () => {});

	// Default task: builds your app
	gulp.task('launch', () => {
		// Default task order
		let preTasks;
		let tasks = ['style', 'other'];
		let postTasks;
		let watchTasks;

		if (config.js.processor === 'webpack') {
			tasks.unshift('webpack');
		} else if (config.js.processor === 'typescript') {
			tasks.unshift('ts');
		} else {
			tasks.unshift('js');
		}

		// Theme roller support for sass or less files
		if (config.css.language === 'sass' || config.css.language === 'less') {
			tasks.unshift('themeroller');
		}

		// Don't do any task if the mode is basic
		if (config.mode === 'basic') {
			preTasks = ['noop'];
			tasks = ['noop'];
		} else {
			preTasks = ['clean'];
		}

		// Post Tasks, if there is no callback, execute browsersync
		if (typeof cb === 'function') {
			postTasks = ['noop'];
			watchTasks = ['noop'];
		} else {
			postTasks = ['browsersync'];
			watchTasks = ['watch'];
		}

		// Print the ascii logo
		console.log(chalk.magenta(templates.asciiLogo()));
		console.log(chalk.cyan('is now processing your files...'));

		// Run tasks
		runSequence(preTasks, tasks, postTasks, watchTasks, () => {
			console.log(chalk.cyan('...Done!'));

			if (typeof cb === 'function') {
				cb();
			} else {
				console.log(chalk.cyan.bold('Now open up your favorite code editor and modify any file in:'));
				console.log(chalk.cyan.bold(config.srcFolder));
				console.log(chalk.cyan.bold('All files in that directory are sync to your APEX app.'));
			}
		});
	});
};
