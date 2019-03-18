/* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: true}}] */

const path = require('path');
const fs = require('fs-extra');

const browsersync = require('browser-sync').create();
const gulp = require('gulp');
const portscanner = require('portscanner');

const validations = require('../util/validations');
const util = require('../util/util');

const portStart = 4000;
const portEnd = 4999;
const localhost = '127.0.0.1';

module.exports = function (cb) {
	const config = util.getConfig();

	// Validate config header section
	validations.header(config);

	// Validate config files array
	validations.validFilesArray(config);

	// Validates if the source folder contains anything
	if (validations.isSrcFolderValid(config)) {
		portscanner.findAPortNotInUse(portStart, portEnd, localhost, (e, port) => {
			require('../gulp/clean')(config);
			require('../gulp/js')(config, browsersync);
			require('../gulp/ts')(config, browsersync);
			require('../gulp/css')(config, browsersync);
			require('../gulp/other')(config, browsersync);
			require('../gulp/themeroller')(config);
			require('../gulp/browsersync')(config, browsersync, port);
			require('../gulp/watch')(config, browsersync);
			require('../gulp/launch')(config, cb);

			gulp.series('launch')();
		});
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
