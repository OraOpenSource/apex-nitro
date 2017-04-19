'use strict';

const gulp = require('gulp');

module.exports = function (config) {
	gulp.task('watch', () => {
		const jsTasks = [];

		if (config.js.processor === 'webpack') {
			jsTasks.unshift('webpack');
		} else {
			jsTasks.unshift('js');
		}

		// Watch for js
		gulp.watch('**/*.js', {
			cwd: config.srcFolder + '/js/'
		}, jsTasks);

		// Watch for style files (scss, sass, less, css)
		// activates theme roller for (scss, sass, less)
		gulp.watch('**/*.scss', {
			cwd: config.srcFolder + '/scss/'
		}, ['style', 'themeroller']);
		gulp.watch('**/*.sass', {
			cwd: config.srcFolder + '/sass/'
		}, ['style', 'themeroller']);
		gulp.watch('**/*.less', {
			cwd: config.srcFolder + '/less/'
		}, ['style', 'themeroller']);
		gulp.watch('**/*.css', {
			cwd: config.srcFolder + '/css/'
		}, ['style']);

		// All files except js, scss, sass, less, css
		const otherFiles = [
			'**/*.*',
			'!js/**/*.js',
			'!scss/**/*.scss',
			'!sass/**/*.sass',
			'!less/**/*.less',
			'!css/**/*.css'
		];
		gulp.watch(otherFiles, {
			cwd: config.srcFolder
		}, ['other']);
	});
};
