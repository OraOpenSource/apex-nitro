'use strict';

const gulp = require('gulp');

module.exports = function (config, browsersync) {
	gulp.task('simple-reload', () => {
		if (config.browsersync.realTime) {
			browsersync.reload();
		}
	});

	gulp.task('simple-stream', () => {
		if (config.browsersync.realTime) {
			return gulp.src(config.srcFolder + '/css/**/*.css')
				.pipe(browsersync.stream({
					match: '**/*.css'
				}));
		}
	});

	gulp.task('watch', done => {
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

		// Theme roller support for sass or less files
		if ((config.css.language === 'sass' || config.css.language === 'less') &&
			(config.themeroller && config.themeroller.files.length > 0)) {
			styleTasks.unshift('themeroller');
		}

		// Watch for js and ts
		gulp.watch('**/*.{js,ts}', {
			cwd: config.srcFolder + '/js/'
		}, gulp.series(jsTasks));

		// Watch for style files (scss, sass, less, css)
		// activates theme roller for (scss, sass, less)
		gulp.watch('**/*.scss', {
			cwd: config.srcFolder + '/scss/'
		}, gulp.parallel(styleTasks));
		gulp.watch('**/*.sass', {
			cwd: config.srcFolder + '/sass/'
		}, gulp.parallel(styleTasks));
		gulp.watch('**/*.less', {
			cwd: config.srcFolder + '/less/'
		}, gulp.parallel(styleTasks));
		gulp.watch('**/*.css', {
			cwd: config.srcFolder + '/css/'
		}, gulp.series(styleTasks));

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
		}, gulp.series(otherTasks));

		done();
	});
};
