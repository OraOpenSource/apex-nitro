'use strict';

const path = require('path');
const gulp = require('gulp');
const webpack = require('webpack');
const BabiliPlugin = require('babili-webpack-plugin');

const templates = require('../templates/templates');

module.exports = function (config, browsersync) {
	let pkg;
	let banner = '';
	const bundleName = config.js.bundleFilename || 'bundle.js';

	const configUnmin = {
		context: config.srcFolder + '/js/',
		entry: config.js.entries,
		devtool: '#source-map',
		output: {
			path: config.distFolder + '/js/',
			filename: bundleName + '.js'
		}
	};

	const configMin = {
		context: config.srcFolder + '/js/',
		entry: config.js.entries,
		devtool: '#source-map',
		output: {
			path: config.distFolder + '/js/',
			filename: bundleName + '.min.js'
		},
		plugins: [
			new BabiliPlugin()
		]
	};

	if (config.header.enabled) {
		pkg = require(path.resolve(config.header.packageJsonPath));
		banner = templates.bannerES6(pkg);

		configUnmin.plugins = [
			new webpack.BannerPlugin({
				banner
			})
		];

		configMin.plugins.push(new webpack.BannerPlugin({
			banner
		}));
	}

	if (config.js.library) {
		configUnmin.output.libraryTarget = 'var';
		configMin.output.libraryTarget = 'var';
		configUnmin.output.library = config.js.libraryName;
		configMin.output.library = config.js.libraryName;
	}

	const webpackConfig = [configUnmin, configMin];

	const webpackTask = function (callback) {
		webpack(webpackConfig, err => {
			if (err) {
				console.error(err);
			}
			callback();
		});
	};

	gulp.task('webpack-gulp', webpackTask);

	// Webpack & browsersync
	gulp.task('webpack', ['webpack-gulp'], () => {
		browsersync.reload();
	});
};
