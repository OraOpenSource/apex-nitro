'use strict';

const configurator = require('json-local-configurator');
const publisher = require('apex-publish-static-files');

const validations = require('../util/validations');
const templates = require('../templates/templates');
const launch = require('./launch');

// Validates if an object is empty (true), otherwise (false)
const getAppID = function (appURL) {
	const paramString = appURL.substring(appURL.indexOf('f?p=') + 4).split(':');
	return paramString[0];
};

module.exports = function (args) {
	// Project is the first argument
	const project = args[0];
	// Checks command line syntax
	validations.cliProjectSyntax(project, 'apex-nitro publish <project>');
	// Get project configuration
	const config = configurator.getConfig({
		modules: ['apex-nitro', 'afeb'],
		project,
		mapping: templates.mapping()
	});

	// Validates project SQLcl info
	validations.publish(config);

	launch([project], undefined, config, () => {
		publisher.publish({
			sqlclPath: config.sqlcl.path,
			connectString: config.sqlcl.connectString,
			directory: config.distFolder,
			appID: getAppID(config.appURL),
			apexDestination: config.apex.apexDestination || ''
		});
	});
};
