'use strict';

const chalk = require('chalk');
const configurator = require('json-local-configurator');

module.exports = {
	// Validates command line syntax and show the available projects
	cliProjectSyntax(project, syntax) {
		if (typeof project === 'undefined') {
			console.error(chalk.red.bold(`\nThe correct syntax is:`), chalk.green.bold(`${syntax}`));
			console.error('\nAvailable projects:');
			configurator.getProjects('afeb').forEach(key => {
				console.error('  -', chalk.cyan.bold(key));
			});
			throw new Error();
		}
	},

	// Validates if a project exists
	projectExists(project) {
		if (typeof configurator.getConfig('afeb')[project] === 'undefined') {
			console.error(chalk.red.bold('Project', project, 'doesn\'t exist in your configuration.'));
			console.error('Type', chalk.cyan.bold('afeb config <project>'), 'to create it, or choose from one of your existing projects:');
			configurator.getProjects('afeb').forEach(key => {
				console.error('  -', chalk.cyan.bold(key));
			});
			throw new Error();
		}
	},

	// Validates missing project header package.json path
	header(project) {
		if (configurator.getConfig('afeb')[project].header.enabled) {
			try {
				require(configurator.getConfig('afeb')[project].header.packageJsonPath);
			} catch (err) {
				console.error(chalk.red.bold('Your \'Header package.json path\' is invalid. It should point to your project package.json file.'));
				throw new Error();
			}
		}
	}
};
