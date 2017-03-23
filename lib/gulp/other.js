'use strict';

const gulp = require('gulp');

module.exports = function (config, browsersync) {
	// Copy other files as is
	gulp.task('other-gulp', () => {
		// All files except js, scss, sass, less, css
		const otherFiles = [
			config.srcFolder + '/**/*.*',
			'!' + config.srcFolder + '/js/**/*.js',
			'!' + config.srcFolder + '/scss/**/*.scss',
			'!' + config.srcFolder + '/sass/**/*.sass',
			'!' + config.srcFolder + '/less/**/*.less',
			'!' + config.srcFolder + '/css/**/*.css'
		];

		return gulp.src(otherFiles)
			.pipe(gulp.dest(config.distFolder));
	});

	// Processes other files and reload
	gulp.task('other', ['other-gulp'], () => {
		browsersync.reload();
	});
};
