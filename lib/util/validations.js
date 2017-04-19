'use strict';

module.exports = {
	// Validates command line synta
	cliProjectSyntax(project, syntax) {
		if (typeof project === 'undefined') {
			throw new Error(`\nThe correct syntax is: ${syntax}`);
		}
	},

	// Validates missing project header package.json path
	header(config) {
		if (config.header && config.header.enabled) {
			try {
				require(config.header.packageJsonPath);
			} catch (err) {
				throw new Error(`Your project's package.json path is invalid.`);
			}
		}
	}
};
