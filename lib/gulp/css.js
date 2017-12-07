'use strict';

const path = require('path');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const clip = require('gulp-clip-empty-files');
const merge = require('merge-stream');
const notifier = require('node-notifier');
const templates = require('../templates/templates');
const options = require('./options');

module.exports = function (config, browsersync) {
	let banner;
	let pkg;
	let taskSuccess;

	const defaultErrorHandler = function (file) {
		taskSuccess = false;
		console.error(file.toString());
		this.emit('end');
	};

	if (config.header && config.header.enabled) {
		banner = templates.banner().join('\n');
		pkg = require(path.resolve(config.header.packageJsonPath));
	}

	gulp.task('style', () => {
		taskSuccess = true;
		const sourceFiles = [];

		if (config.css.language === 'sass') {
			sourceFiles.push(config.srcFolder + '/scss/*.scss');
			sourceFiles.push(config.srcFolder + '/sass/*.sass');
		} else if (config.css.language === 'less') {
			sourceFiles.push(config.srcFolder + '/less/*.less');
		} else {
			sourceFiles.push(config.srcFolder + '/css/*.css');
		}

		// Creates the source stream that will be used for unmin and min versions
		const sourceStream = gulp.src(sourceFiles)
			.pipe(plugins.plumber({
				errorHandler: defaultErrorHandler
			}))
			.pipe(plugins.if(config.header.enabled, plugins.header(banner, {
				pkg
			})))
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.if(config.css.language === 'sass', plugins.sass(options.sassOptions(config))))
			.pipe(plugins.if(config.css.language === 'less', plugins.less(options.lessOptions(config))))
			.pipe(plugins.if(config.css.concat, plugins.concat(config.css.concatFilename + '.css')))
			.pipe(plugins.autoprefixer());

		// Creates the unmin css
		const unmin = sourceStream
			.pipe(plugins.clone())
			// .pipe(plugins.autoprefixer())
			.pipe(plugins.sourcemaps.write('./'));

		// Creates the min css
		const min = sourceStream
			.pipe(plugins.clone())
			// .pipe(plugins.autoprefixer())
			.pipe(plugins.cssnano(options.cssnanoOptions()))
			.pipe(plugins.rename(options.renameOptions()))
			.pipe(plugins.sourcemaps.write('./'));

		// Adds the unmin and the min version to the stream
		return merge(unmin, min)
			.pipe(clip())
			.pipe(gulp.dest(config.distFolder + '/css/'))
			.pipe(browsersync.stream({
				match: '**/*.css'
			}));
	});

	// Javascript & browsersync
	gulp.task('style-watch', ['style'], () => {
		if (taskSuccess) {
			if (config.browsersync.notify) {
				notifier.notify(options.notifySuccessCSS());
			}
		} else {
			notifier.notify(options.notifyError());
		}
	});
};
