'use strict';

const path = require('path');
const gulp = require('gulp');
const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const notifier = require('node-notifier');
const templates = require('../templates/templates');
const options = require('./options');

module.exports = function (config, browsersync) {
	let pkg;
	let banner = '';
	let taskSuccess;

	const bundleName = config.js.bundleFilename || 'bundle';

	const configUnmin = {
		mode: 'development',
		context: config.srcFolder + '/js/',
		entry: config.js.entries,
		devtool: 'source-map',
		output: {
			path: config.distFolder + '/js/',
			filename: bundleName + '.js'
		},
		plugins: [
			new webpack.NoEmitOnErrorsPlugin()
		]
	};

	const configMin = {
		mode: 'production',
		context: config.srcFolder + '/js/',
		entry: config.js.entries,
		output: {
			path: config.distFolder + '/js/',
			filename: bundleName + '.min.js'
		},
		plugins: [
			new MinifyPlugin(),
			new webpack.NoEmitOnErrorsPlugin()
		]
	};

	if (config.header.enabled) {
		pkg = require(path.resolve(config.header.packageJsonPath));
		banner = templates.bannerES6(pkg);

		configUnmin.plugins.push(new webpack.BannerPlugin({
			banner
		}));

		configMin.plugins.push(new webpack.BannerPlugin({
			banner
		}));
	}

	configUnmin.output.libraryTarget = 'var';
	configMin.output.libraryTarget = 'var';
	configUnmin.output.library = config.js.bundleName;
	configMin.output.library = config.js.bundleName;

	const webpackConfig = [configUnmin, configMin];

	const webpackTask = function (cb) {
		taskSuccess = true;
		webpack(webpackConfig, (err, stats) => {
			if (err) {
				console.error(err.stack || err);
				if (err.details) {
					taskSuccess = false;
					console.error('err.details', err.details);
				}
				return;
			}

			const info = stats.toJson();

			if (stats.hasErrors()) {
				taskSuccess = false;
				console.error('info.errors', info.errors);
			}

			if (stats.hasWarnings()) {
				taskSuccess = false;
				console.warn('info.warnings', info.warnings);
			}

			cb();
		});
	};

	// Webpack
	gulp.task('webpack', webpackTask);

	// Webpack & Browsersync
	gulp.task('webpack-watch', gulp.series('webpack', done => {
		if (taskSuccess) {
			if (config.browsersync.realTime) {
				browsersync.reload();

				if (config.browsersync.notify) {
					notifier.notify(options.notifySuccessJS());
				}
			}
		} else {
			notifier.notify(options.notifyError());
		}
		done();
	}));
};
