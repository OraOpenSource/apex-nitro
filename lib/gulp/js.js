'use strict';

const path = require('path');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const templates = require('../templates/templates');

module.exports = function (config, browsersync) {
	const uglifyOptions = {
		preserveComments: 'license'
	};

	const renameOptions = {
		suffix: '.min'
	};

	const sizeOptions = {
		showFiles: true
	};

	// Avoid uglifying map files
	const errorHandler = function (e) {
		if (!path.extname(e.fileName) === '.map') {
			console.error(e);
		}
	};

	let pkg;
	let banner;

	if (config.header.enabled) {
		pkg = require(config.header.packageJsonPath);
		banner = templates.banner().join('\n');
	}

	// Javascript
	gulp.task('js-gulp', () => {
		return gulp.src(config.srcFolder + '/js/*.js')
			.pipe(plugins.plumber())
			.pipe(plugins.jshint())
			.pipe(plugins.jshint.reporter('jshint-stylish'))
			.pipe(plugins.if(config.header.enabled, plugins.header(banner, {pkg})))
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.if(config.jsConcat.enabled, plugins.concat(config.jsConcat.finalName + '.js')))
			.pipe(plugins.size(sizeOptions))
			.pipe(plugins.sourcemaps.write('./'))
			.pipe(gulp.dest(config.distFolder + '/js/'))
			.pipe(plugins.uglify(uglifyOptions)).on('error', e => {
				errorHandler(e);
			})
			.pipe(plugins.rename(renameOptions))
			.pipe(plugins.size(sizeOptions))
			.pipe(plugins.sourcemaps.write('./'))
			.pipe(gulp.dest(config.distFolder + '/js/'));
	});

	// Javascript & browsersync
	gulp.task('js', ['js-gulp'], () => {
		browsersync.reload();
	});
};
