'use strict';

const gulp = require('gulp');

module.exports = function (cb) {
	// Provides a callback for the test suite
	// Which indicates the test has been successful
	gulp.task('test', () => {
		if (typeof cb === 'function') {
			cb();
		}
	});
};
