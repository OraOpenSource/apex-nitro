'use strict';

const path = require('path');

module.exports = {
	// Validates command line synta
	cliProjectSyntax(project, syntax) {
		if (typeof project === 'undefined') {
			throw new TypeError(`\nThe correct syntax is: ${syntax}`);
		}
	},

	// Validates missing project header package.json path
	header(config) {
		if (config.header && config.header.enabled) {
			try {
				require(path.resolve(config.header.packageJsonPath));
			} catch (err) {
				throw new Error(`Your project's package.json path is invalid.`);
			}
		}
	},

	// Validates configuration for the publish feature
	publish(config, project) {
		const errorMessage = function (key) {
			return `Your project configuration is missing ${key} information. Please review your project configuration by typing: apex-nitro config ${project}`;
		};

		if (!config.publish || !config.publish.path) {
			throw new Error(errorMessage('SQLcl path'));
		} else if (config.publish.connectionType === 'basic') {
			if (!config.publish.username) {
				throw new Error(errorMessage('database username'));
			}

			if (!config.publish.host) {
				throw new Error(errorMessage('database host'));
			}

			if (!config.publish.port) {
				throw new Error(errorMessage('database port'));
			}

			if (!config.publish.basicType === 'sid') {
				if (!config.publish.sid) {
					throw new Error(errorMessage('database sid'));
				}
			}

			if (!config.publish.basicType === 'service name') {
				if (!config.publish.serviceName) {
					throw new Error(errorMessage('database service name'));
				}
			}

			if (!config.publish.basicType === 'tns') {
				if (!config.publish.tns) {
					throw new Error(errorMessage('database tns'));
				}
			}
		} else if (config.publish.connectionType === 'custom') {
			if (!config.publish.connectionString) {
				throw new Error(errorMessage('database connection string'));
			}
		} else {
			throw new Error(errorMessage('database connection type'));
		}
	}
};
