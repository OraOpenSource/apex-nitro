'use strict';

const path = require('path');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const notifier = require('node-notifier');
const templates = require('../templates/templates');
const options = require('./options');

module.exports = function (config, browsersync) {
	let banner;
	let pkg;
	let taskSuccess;

	// Evaluates if the task has failed or not at the time of invoking
	const isSuccess = function () {
		return taskSuccess;
	};

	// Show errors except on .map files
	const defaultErrorHandler = function (file) {
		if (!file.fileName || !path.extname(file.fileName) === '.map') {
			taskSuccess = false;
			console.error(file.toString());
			this.emit('end');
		}
	};

	// Detects if there is an error with jshint
	const jshintErrorHandler = function (file) {
		if (!file.jshint.success) {
			file.jshint.results.forEach(result => {
				// If there is no error then nothing happens...
				if (!result.error) {
					return;
				}

				// E = error, W = Warning
				if (result.error.code.charAt(0) === 'E') {
					taskSuccess = false;
				}
			});
		}

		// Don't show anything
		return false;
	};

	if (config.header.enabled) {
		banner = templates.banner().join('\n');
		pkg = require(path.resolve(config.header.packageJsonPath));
	}

	// JavaScript
	gulp.task('js', () => {
		taskSuccess = true;
		return gulp.src(config.srcFolder + '/js/**/*.js')
			.pipe(plugins.plumber({
				errorHandler: defaultErrorHandler
			}))
			.pipe(plugins.jshint())
			.pipe(plugins.jshint.reporter('jshint-stylish'))
			.pipe(plugins.notify(jshintErrorHandler))
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.if(config.js.concat, plugins.concat(config.js.concatFilename + '.js')))
			.pipe(plugins.if(config.header.enabled, plugins.header(banner, {
				pkg
			})))
			.pipe(plugins.sourcemaps.write('./'))
			.pipe(plugins.if(isSuccess, gulp.dest(config.distFolder + '/js/')))
			.pipe(plugins.uglify(options.uglifyOptions()))
			.pipe(plugins.rename(options.renameOptions()))
			.pipe(plugins.sourcemaps.write('./'))
			.pipe(plugins.if(isSuccess, gulp.dest(config.distFolder + '/js/')));
	});

	// JavaScript & Browsersync
	gulp.task('js-watch', gulp.series('js', done => {
		if (taskSuccess) {
			browsersync.reload();

			if (config.browsersync.notify) {
				notifier.notify(options.notifySuccessJS());
			}
		} else {
			notifier.notify(options.notifyError());
		}
		done();
	}));
};
