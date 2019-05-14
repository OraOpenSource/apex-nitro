const path = require('path');
const gulp = require('gulp');
const notifier = require('node-notifier');
const options = require('./options');

module.exports = function (config, browsersync) {
	// Copy other files as is
	gulp.task('other', () => {
		// All files except js, scss, sass, less, css, ts
		const otherFiles = [
			path.resolve(config.srcFolder, '**/*.*'),
			'!' + path.resolve(config.srcFolder, 'js', '**/*.{js,ts}'),
			'!' + path.resolve(config.srcFolder, 'scss', '**/*.scss'),
			'!' + path.resolve(config.srcFolder, 'sass', '**/*.sass'),
			'!' + path.resolve(config.srcFolder, 'less', '**/*.less'),
			'!' + path.resolve(config.srcFolder, 'css', '**/*.css')
		];

		return gulp.src(otherFiles).pipe(gulp.dest(path.resolve(config.distFolder)));
	});

	// Processes other files and reload
	gulp.task(
		'other-watch',
		gulp.series('other', done => {
			if (config.browsersync.realTime) {
				browsersync.reload();

				if (config.browsersync.notify) {
					notifier.notify(options.notifySuccessOther());
				}
			}

			done();
		})
	);
};
