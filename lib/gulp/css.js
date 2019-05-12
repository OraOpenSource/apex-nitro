const path = require('path');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const clip = require('gulp-clip-empty-files');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const merge = require('merge-stream');
const notifier = require('node-notifier');
const templates = require('../templates/templates');
const util = require('../util/util');
const options = require('./options');

module.exports = function(config, browsersync) {
	let banner;
	let pkg;
	let taskSuccess;

	const defaultErrorHandler = function(file) {
		taskSuccess = false;
		console.error(file.toString());
		this.emit('end');
	};

	if (config.header && config.header.enabled) {
		banner = templates.banner().join('\n');
		pkg = require(path.resolve(config.header.packageJsonPath));
	}

	gulp.task('style', () => {
		taskSuccess = true;
		const sourceFiles = [];

		if (config.css.language === 'sass') {
			sourceFiles.push(path.resolve(config.srcFolder, 'scss', '**/*.scss'));
			sourceFiles.push(path.resolve(config.srcFolder, 'sass', '**/*.sass'));
		} else if (config.css.language === 'less') {
			sourceFiles.push(path.resolve(config.srcFolder, 'less', '**/*.less'));
		} else {
			sourceFiles.push(path.resolve(config.srcFolder, 'css', '**/*.css'));
		}

		// Creates the source stream that will be used for unmin and min versions
		const sourceStream = gulp
			.src(sourceFiles)
			.pipe(
				plugins.plumber({
					errorHandler: defaultErrorHandler
				})
			)
			.pipe(plugins.sourcemaps.init())
			.pipe(
				plugins.if(
					config.css.language === 'sass',
					plugins.sass(options.sassOptions(config))
				)
			)
			.pipe(
				plugins.if(
					config.css.language === 'less',
					plugins.less(options.lessOptions(config))
				)
			)
			.pipe(
				plugins.if(
					config.css.cssConcat,
					plugins.concat(util.padStr(config.css.cssConcatFilename, '.css'))
				)
			)
			.pipe(
				plugins.if(
					config.header.enabled,
					plugins.header(banner, {
						pkg
					})
				)
			)
			.pipe(postcss([autoprefixer(options.autoprefixerOptions())]));

		// Creates the unmin css
		const unmin = sourceStream.pipe(plugins.clone()).pipe(plugins.sourcemaps.write('./'));

		// Creates the min css
		const min = sourceStream
			.pipe(plugins.clone())
			.pipe(plugins.cleanCss())
			.pipe(plugins.rename(options.renameOptions()));

		// Adds the unmin and the min version to the stream
		return merge(unmin, min)
			.pipe(clip())
			.pipe(gulp.dest(path.resolve(config.distFolder, 'css')))
			.pipe(
				plugins.if(
					config.browsersync.realTime,
					browsersync.stream({
						match: '**/*.css'
					})
				)
			);
	});

	// Javascript & browsersync
	gulp.task(
		'style-watch',
		gulp.series('style', done => {
			if (taskSuccess) {
				if (config.browsersync.realTime && config.browsersync.notify) {
					notifier.notify(options.notifySuccessCSS());
				}
			} else {
				notifier.notify(options.notifyError());
			}

			done();
		})
	);
};
