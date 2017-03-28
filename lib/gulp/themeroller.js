'use strict';

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const scssToLess = require('../util/scss-to-less');

module.exports = function (config) {
	// Creates a less file for theme roller
	gulp.task('themeroller', () => {
		if (config.themeroller) {
			if (config.themeroller.files.length > 0) {
				return gulp.src(config.themeroller.files)
					.pipe(plugins.if(config.sass.enabled, scssToLess()))
					.pipe(plugins.concat('themeroller.less'))
					.pipe(gulp.dest(config.distFolder + '/less/'));
			}
		}
	});
};
