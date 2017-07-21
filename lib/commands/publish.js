'use strict';

const readline = require('readline');
const npc = require('node-package-configurator');
const publisher = require('apex-publish-static-files');

const validations = require('../util/validations');
const templates = require('../templates/templates');
const launch = require('./launch');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// Validates if an object is empty (true), otherwise (false)
const getAppID = function (appURL) {
	const paramString = appURL.substring(appURL.indexOf('f?p=') + 4).split(':');
	return paramString[0];
};

// Returns a connect string for SQLcl based on the project configuration
const getConnectString = function (sqlcl, password) {
	if (sqlcl.connectionType === 'basic' && sqlcl.basicType === 'sid') {
		return `${sqlcl.username}/${password}@${sqlcl.host}:${sqlcl.port}:${sqlcl.sid}`;
	} else if (sqlcl.connectionType === 'basic' && sqlcl.basicType === 'service name') {
		return `${sqlcl.username}/${password}@${sqlcl.host}:${sqlcl.port}/${sqlcl.serviceName}`;
	} else if (sqlcl.connectionType === 'basic' && sqlcl.basicType === 'tns') {
		return `${sqlcl.username}/${password}@${sqlcl.host}:${sqlcl.port}/${sqlcl.tns}`;
	}
	return sqlcl.connectionString;
};

module.exports = function (args) {
	// Project is the first argument
	const project = args[0];
	// Checks command line syntax
	validations.cliProjectSyntax(project, 'apex-nitro publish <project>');
	// Get project configuration
	const config = npc.getConfig({
		modules: ['apex-nitro', 'afeb'],
		project,
		mapping: templates.mapping()
	});

	// Validates project SQLcl info
	validations.publish(config);

	// Launches the project and publishes the files
	const launchPublish = function (password) {
		launch([project], undefined, config, () => {
			publisher.publish({
				sqlclPath: config.sqlcl.path,
				connectString: getConnectString(config.sqlcl, password),
				directory: config.distFolder,
				appID: getAppID(config.appURL),
				apexDestination: config.apex.apexDestination || ''
			});
		});
	};

	// If the password is not provided, let's prompt it to the user
	if (config.sqlcl.connectionType === 'basic' && config.sqlcl.password === undefined) {
		rl.question('Enter your database schema password: ', answer => {
			launchPublish(answer);
			rl.close();
		});
	} else {
		launchPublish(config.sqlcl.password);
	}
};
