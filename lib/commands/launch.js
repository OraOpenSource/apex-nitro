'use strict';

const browsersync = require('browser-sync').create();
const gulp = require('gulp');
const portscanner = require('portscanner');
const configurator = require('json-local-configurator');

const templates = require('../templates/templates');
const validations = require('../util/validations');

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
		config = configurator.getConfig({
			modules: ['apex-nitro', 'afeb'],
			project,
			mapping: templates.mapping()
		});
	}

	// Missing project header.packageJsonPath
	validations.header(project);

	portscanner.findAPortNotInUse(portStart, portEnd, localhost, (e, port1) => {
		portscanner.findAPortNotInUse(port1 + 1, portEnd, localhost, (e, port2) => {
			portscanner.findAPortNotInUse(port2 + 1, portEnd, localhost, (e, port3) => {
				const ports = [port1, port2, port3];
				// Gulp tasks
				require('../gulp/clean')(config);
				require('../gulp/js')(config, browsersync);
				require('../gulp/webpack')(config, browsersync);
				require('../gulp/css')(config, browsersync);
				require('../gulp/other')(config, browsersync);
				require('../gulp/themeroller')(config);
				require('../gulp/test')(cb);
				require('../gulp/browsersync')(config, browsersync, ports);
				require('../gulp/watch')(config, browsersync);
				require('../gulp/launch')(config, cb);

				// Launch tasks
				gulp.start('launch');
			});
		});
	});
};
