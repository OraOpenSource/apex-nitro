'use strict';

const gulp = require('gulp');
const del = require('del');
const dir = require('../util/dir');

module.exports = function (config) {
	// Deletes the dist directory before recreating it
	gulp.task('clean', () => {
		return del([config.distFolder], {
			force: true
		}).then(() => {
			dir.makeDirectoryStructure(config.distFolder);
		});
	});
};
