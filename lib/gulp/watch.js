'use strict';

const gulp = require('gulp');
const notifier = require('node-notifier');
const options = require('./options');

module.exports = function (config, browsersync) {
	gulp.task('basic-js', done => {
		notifier.notify(options.notifySuccessJS());
		browsersync.reload();
		done();
	});

	gulp.task('basic-style', () => {
		notifier.notify(options.notifySuccessCSS());
		return gulp.src(config.srcFolder + '/css/**/*.css')
			.pipe(browsersync.stream({
				match: '**/*.css'
			}));
	});

	gulp.task('basic-other', done => {
		notifier.notify(options.notifySuccessOther());
		browsersync.reload();
		done();
	});

	gulp.task('watch', done => {
		// Default tasks for a basic mode
		let jsTasks = ['basic-js'];
		let styleTasks = ['basic-style'];
		let otherTasks = ['basic-other'];

		// Tasks for advanced mode
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

			// Theme roller support for sass or less files
			if ((config.css.language === 'sass' || config.css.language === 'less') &&
				(config.themeroller && config.themeroller.files.length > 0)) {
				styleTasks.unshift('themeroller');
			}
		}

		// Watch for js and ts
		gulp.watch('**/*.{js,ts}', {
			cwd: config.srcFolder + '/js/'
		}, gulp.parallel(jsTasks));

		// Watch for style files (scss, sass, less, css)
		// activates theme roller for (scss, sass, less)
		gulp.watch('**/*.css', {
			cwd: config.srcFolder + '/css/'
		}, gulp.parallel(styleTasks));
		gulp.watch('**/*.scss', {
			cwd: config.srcFolder + '/scss/'
		}, gulp.parallel(styleTasks));
		gulp.watch('**/*.sass', {
			cwd: config.srcFolder + '/sass/'
		}, gulp.parallel(styleTasks));
		gulp.watch('**/*.less', {
			cwd: config.srcFolder + '/less/'
		}, gulp.parallel(styleTasks));

		// All files except js, scss, sass, less, css
		const otherFiles = [
			'**/*.*',
			'!js/**/*.{js,ts}',
			'!css/**/*.css',
			'!scss/**/*.scss',
			'!sass/**/*.sass',
			'!less/**/*.less'
		];
		gulp.watch(otherFiles, {
			cwd: config.srcFolder
		}, gulp.parallel(otherTasks));

		done();
	});
};
