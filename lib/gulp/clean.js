'use strict';

const gulp = require('gulp');
const del = require('del');

module.exports = function (config) {
	// Cleans the dist directory
	gulp.task('clean', () => {
		return del([config.distFolder], {
			force: true
		});
	});
};
