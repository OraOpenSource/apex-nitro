'use strict';

const chalk = require('chalk');
const configurator = require('json-local-configurator');

module.exports = function () {
	console.log('\nAvailable projects:');
	configurator.getProjects({modules: ['apex-nitro', 'afeb']}).forEach(key => {
		console.log('  -', chalk.cyan.bold(key));
	});
};
