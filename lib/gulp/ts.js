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

	// Avoid uglifying map files
	const errorHandler = function (e) {
		if (!path.extname(e.fileName) === '.map') {
			console.error(e);
		}
	};

	let pkg;
	let banner;

	if (config.header.enabled) {
		pkg = require(path.resolve(config.header.packageJsonPath));
		banner = templates.banner().join('\n');
	}

	// TypeScript
	gulp.task('ts-gulp', () => {
		return gulp.src(config.srcFolder + '/js/*.{ts,js}')
			.pipe(plugins.plumber())
			.pipe(plugins.if(config.header.enabled, plugins.header(banner, {pkg})))
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.typescript({
				noImplicitAny: true,
				allowJs: true,
				outFile: config.js.concatFilename + '.js'
			}))
			.pipe(plugins.sourcemaps.write())
			.pipe(plugins.uglify(uglifyOptions)).on('error', e => {
				errorHandler(e);
			})
			.pipe(plugins.rename(renameOptions))
			.pipe(plugins.sourcemaps.write())
			.pipe(gulp.dest(config.distFolder + '/js/'));
	});

	// TypeScript & browsersync
	gulp.task('ts', ['ts-gulp'], () => {
		browsersync.reload();
	});
};
