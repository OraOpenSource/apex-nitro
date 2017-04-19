'use strict';

const chalk = require('chalk');
const configurator = require('json-local-configurator');

// AFEB - list
module.exports = function () {
	console.log('\nAvailable projects:');
	configurator.getProjects({module: 'afeb'}).forEach(key => {
		console.log('  -', chalk.cyan.bold(key));
	});
};
