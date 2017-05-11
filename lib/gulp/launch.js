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

		if (config.js.processor === 'webpack') {
			tasks.unshift('webpack');
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

		// Post Tasks, handling either the test suite or browsersync
		if (typeof cb === 'function') {
			postTasks = 'test';
		} else {
			postTasks = 'browsersync';
		}

		// Print the ascii logo
		console.log(chalk.magenta(templates.asciiLogo()));
		console.log(chalk.cyan('APEX Nitro is now processing your files...'));

		// Run tasks
		runSequence(preTasks, tasks, postTasks, 'watch', () => {
			console.log(chalk.cyan('...Done!'));
			console.log(chalk.cyan.bold('Now open up your favorite code editor and modify any file in:'));
			console.log(chalk.cyan.bold(config.srcFolder));
			console.log(chalk.cyan.bold('All files in that directory are sync to your APEX app.'));
		});
	});
};
