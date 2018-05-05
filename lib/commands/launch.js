/* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: true}}] */

'use strict';

const browsersync = require('browser-sync').create();
const gulp = require('gulp');
const portscanner = require('portscanner');
const npc = require('node-package-configurator');

const templates = require('../templates/templates');
const validations = require('../util/validations');
const dir = require('../util/dir');

const portStart = 4000;
const portEnd = 4999;
const localhost = '127.0.0.1';

module.exports = function (args, argv, config, cb) {
	// Project is the first argument
	const project = args[0];

	// Validates command line syntax
	validations.cliProjectSyntax(project, 'apex-nitro launch <project>');

	// Get project configuration
	if (!config) {
		config = npc.getConfig({
			modules: ['apex-nitro', 'afeb'],
			project,
			mapping: templates.mapping()
		});
	}

	// Missing project header.packageJsonPath
	validations.header(project);

	// Checks if the theme roller files are valid
	validations.validFilesArray(config);

	// Validates if the project source folder contains anything
	if (validations.isSrcFolderValid(config)) {
		portscanner.findAPortNotInUse(portStart, portEnd, localhost, (e, port) => {
			require('../gulp/clean')(config);
			require('../gulp/js')(config, browsersync);
			require('../gulp/ts')(config, browsersync);
			require('../gulp/webpack')(config, browsersync);
			require('../gulp/css')(config, browsersync);
			require('../gulp/other')(config, browsersync);
			require('../gulp/themeroller')(config);
			require('../gulp/browsersync')(config, browsersync, port);
			require('../gulp/watch')(config, browsersync);
			require('../gulp/launch')(config, project, cb);

			gulp.series('launch')();
		});
	} else {
		// Source folder is invalid, but we are still going to create the dist folder
		// This allows for a smooter build, where the publish feature can still fetch an empty directory
		if (config.distFolder) {
			dir.makeDirectoryStructure(config.distFolder);
		}

		if (typeof cb === 'function') {
			cb();
		}
	}
};
