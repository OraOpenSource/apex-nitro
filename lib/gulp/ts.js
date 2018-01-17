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

	if (config.header.enabled) {
		banner = templates.banner().join('\n');
		pkg = require(path.resolve(config.header.packageJsonPath));
	}

	// TypeScript
	gulp.task('ts', () => {
		taskSuccess = true;
		return gulp.src(config.srcFolder + '/js/*.{ts,js}')
			.pipe(plugins.plumber({
				errorHandler: defaultErrorHandler
			}))
			.pipe(plugins.if(config.header.enabled, plugins.header(banner, {pkg})))
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.typescript({
				noImplicitAny: true,
				allowJs: true
			}))
			.pipe(plugins.if(config.js.tsConcat, plugins.concat(config.js.tsConcatFilename + '.js')))
			.pipe(plugins.sourcemaps.write('.'))
			.pipe(plugins.if(isSuccess, gulp.dest(config.distFolder + '/js/')))
			.pipe(plugins.uglify(options.uglifyOptions()))
			.pipe(plugins.rename(options.renameOptions()))
			.pipe(plugins.sourcemaps.write('.'))
			.pipe(plugins.if(isSuccess, gulp.dest(config.distFolder + '/js/')));
	});

	// TypeScript & browsersync
	gulp.task('ts-watch', gulp.series('ts', () => {
		if (taskSuccess) {
			browsersync.reload();

			if (config.browsersync.notify) {
				notifier.notify(options.notifySuccessJS());
			}
		} else {
			notifier.notify(options.notifyError());
		}
	}));
};
