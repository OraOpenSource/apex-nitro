'use strict';

const gulp = require('gulp');

module.exports = function (config, browsersync) {
	gulp.task('reload', () => {
		browsersync.reload();
	});

	gulp.task('stream', () => {
		return gulp.src(config.srcFolder + '/css/*.css')
			.pipe(browsersync.stream({
				match: '**/*.css'
			}));
	});

	gulp.task('watch', () => {
		let jsTasks = ['reload'];
		let styleTasks = ['stream'];
		let otherTasks = ['reload'];

		if (config.mode === 'advanced') {
			if (config.js.processor === 'webpack') {
				jsTasks = ['webpack'];
			} else if (config.js.processor === 'typescript') {
        jsTasks = ['ts']
      } else {
				jsTasks = ['js'];
			}

			styleTasks = ['style'];
			otherTasks = ['other'];
		}

		// Watch for js and ts
		gulp.watch('**/*.{js,ts}', {
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
