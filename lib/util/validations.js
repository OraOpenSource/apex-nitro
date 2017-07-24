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

		if (!config.sqlcl || !config.sqlcl.path) {
			throw new Error(errorMessage('SQLcl path'));
		} else if (config.sqlcl.connectionType === 'basic') {
			if (!config.sqlcl.username) {
				throw new Error(errorMessage('database username'));
			}

			if (!config.sqlcl.host) {
				throw new Error(errorMessage('database host'));
			}

			if (!config.sqlcl.port) {
				throw new Error(errorMessage('database port'));
			}

			if (!config.sqlcl.basicType === 'sid') {
				if (!config.sqlcl.sid) {
					throw new Error(errorMessage('database sid'));
				}
			}

			if (!config.sqlcl.basicType === 'service name') {
				if (!config.sqlcl.serviceName) {
					throw new Error(errorMessage('database service name'));
				}
			}

			if (!config.sqlcl.basicType === 'tns') {
				if (!config.sqlcl.tns) {
					throw new Error(errorMessage('database tns'));
				}
			}
		} else if (config.sqlcl.connectionType === 'custom') {
			if (!config.sqlcl.connectionString) {
				throw new Error(errorMessage('database connection string'));
			}
		} else {
			throw new Error(errorMessage('database connection type'));
		}
	}
};
