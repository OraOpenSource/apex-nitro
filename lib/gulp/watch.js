'use strict';

const gulp = require('gulp');

module.exports = function (config, browsersync) {
	gulp.task('simple-reload', () => {
		browsersync.reload();
	});

	gulp.task('simple-stream', () => {
		return gulp.src(config.srcFolder + '/css/*.css')
			.pipe(browsersync.stream({
				match: '**/*.css'
			}));
	});

	gulp.task('watch', () => {
		// Defaults tasks for a simple flow (not advanced)
		let jsTasks = ['simple-reload'];
		let styleTasks = ['simple-stream'];
		let otherTasks = ['simple-reload'];

		if (config.mode === 'advanced') {
			if (config.js.processor === 'webpack') {
				jsTasks = ['webpack-watch'];
			} else if (config.js.processor === 'typescript') {
				jsTasks = ['ts-watch'];
			} else {
				jsTasks = ['js-watch'];
			}

			styleTasks = ['style-watch'];
			otherTasks = ['other-watch'];
		}

		// Watch for js and ts
		gulp.watch('**/*.{js,ts}', {
			cwd: config.srcFolder + '/js/'
		}, jsTasks);

		// Watch for style files (scss, sass, less, css)
		// activates theme roller for (scss, sass, less)
		gulp.watch('**/*.scss', {
			cwd: config.srcFolder + '/scss/'
		}, ['style-watch', 'themeroller']);
		gulp.watch('**/*.sass', {
			cwd: config.srcFolder + '/sass/'
		}, ['style-watch', 'themeroller']);
		gulp.watch('**/*.less', {
			cwd: config.srcFolder + '/less/'
		}, ['style-watch', 'themeroller']);
		gulp.watch('**/*.css', {
			cwd: config.srcFolder + '/css/'
		}, styleTasks);

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
		}, otherTasks);
	});
};
