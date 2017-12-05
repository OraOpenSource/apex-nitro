'use strict';

const gulp = require('gulp');
const del = require('del');

module.exports = function (config) {
	// Deletes the dist directory before recreating it
	gulp.task('clean', () => {
		return del([config.distFolder], {
			force: true
		});
	});
};
