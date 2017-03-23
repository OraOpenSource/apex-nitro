'use strict';

const path = require('path');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const clip = require('gulp-clip-empty-files');
const merge = require('merge-stream');

const templates = require('../templates/templates');

module.exports = function (config, browsersync) {
	const sassOptions = {
		sourcemap: true,
		includePaths: [
			path.normalize(config.sass.includePath || '')
		]
	};
	const lessOptions = {
		paths: [
			path.normalize(config.less.includePath || '')
		]
	};
	const cssnanoOptions = {
		safe: true
	};
	const renameOptions = {
		suffix: '.min'
	};
	const sizeOptions = {
		showFiles: true
	};

	let pkg;
	let banner;

	if (config.header.enabled) {
		pkg = require(config.header.packageJsonPath);
		banner = templates.banner().join('\n');
	}

	gulp.task('style', () => {
		const sourceFiles = [];

		if (config.sass.enabled) {
			sourceFiles.push(config.srcFolder + '/scss/*.scss');
			sourceFiles.push(config.srcFolder + '/sass/*.sass');
		} else if (config.less.enabled) {
			sourceFiles.push(config.srcFolder + '/less/*.less');
		} else {
			sourceFiles.push(config.srcFolder + '/css/*.css');
		}

		// Creates the source stream that will be used for unmin and min versions
		const sourceStream = gulp.src(sourceFiles)
			.pipe(plugins.plumber({
				errorHandler(err) {
					console.log(err.toString());
					this.emit('end');
				}
			}))
			.pipe(plugins.if(config.header.enabled, plugins.header(banner, {
				pkg
			})))
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.if(config.sass.enabled, plugins.sass(sassOptions).on('error', plugins.sass.logError)))
			.pipe(plugins.if(config.less.enabled, plugins.less(lessOptions)))
			.pipe(plugins.if(config.cssConcat.enabled, plugins.concat(config.cssConcat.finalName + '.css')));

		// Creates the unmin css
		const unmin = sourceStream
			.pipe(plugins.clone())
			.pipe(plugins.autoprefixer())
			.pipe(plugins.size(sizeOptions))
			.pipe(plugins.sourcemaps.write('./'));

		// Creates the min css
		const min = sourceStream
			.pipe(plugins.clone())
			.pipe(plugins.autoprefixer())
			.pipe(plugins.cssnano(cssnanoOptions))
			.pipe(plugins.rename(renameOptions))
			.pipe(plugins.size(sizeOptions))
			.pipe(plugins.sourcemaps.write('./'));

		// Adds the unmin and the min version to the stream
		return merge(unmin, min)
			.pipe(clip())
			.pipe(gulp.dest(config.distFolder + '/css/'))
			.pipe(browsersync.stream({
				match: '**/*.css'
			}));
	});
};
