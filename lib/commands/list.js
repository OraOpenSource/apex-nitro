'use strict';

const chalk = require('chalk');
const npc = require('node-package-configurator');

module.exports = function () {
	console.log('\nAvailable projects:');
	npc.getProjects({modules: ['apex-nitro', 'afeb']}).forEach(key => {
		console.log('  -', chalk.cyan.bold(key));
	});
};
