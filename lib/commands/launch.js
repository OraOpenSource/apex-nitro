/* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: true}}] */

const path = require('path');
const fs = require('fs-extra');
const browsersync = require('browser-sync').create();
const gulp = require('gulp');
const validations = require('../util/validations');
const util = require('../util/util');

module.exports = function (cb) {
	/* Test:
	console.log('launching pro now ...');
	const build = require(path.resolve(process.cwd(), 'bin', 'build.js'));
	build(); // Run build in development mode
	return;
	*/

	const config = util.getConfig();

	// Validate config header section
	validations.header(config);

	// Validate config files array
	validations.validFilesArray(config);

	// Validates if the source folder contains anything
	if (validations.isSrcFolderValid(config)) {
		// Pro mode contains less steps, as they are done in the template itself
		if (config.mode === 'pro') {
			require('../gulp/clean')(config);
			require('../gulp/pro.js')(config, browsersync);
			require('../gulp/browsersync')(config, browsersync, config.launchPort);
			require('../gulp/watch')(config, browsersync);
			require('../gulp/launch')(config, cb);
		} else {
			require('../gulp/clean')(config);
			require('../gulp/js')(config, browsersync);
			require('../gulp/ts')(config, browsersync);
			require('../gulp/css')(config, browsersync);
			require('../gulp/other')(config, browsersync);
			require('../gulp/themeroller')(config);
			require('../gulp/browsersync')(config, browsersync, config.launchPort);
			require('../gulp/watch')(config, browsersync);
			require('../gulp/launch')(config, cb);
		}

		gulp.series('launch')();
	} else {
		// Source folder is invalid, but we are still going to create the dist folder
		// This allows for a smoother build, where the publish feature can still fetch an empty directory
		if (config.distFolder) {
			fs.ensureDirSync(path.resolve(config.distFolder));
		}

		if (typeof cb === 'function') {
			cb();
		}
	}
};
