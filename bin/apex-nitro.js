#!/usr/bin/env node

const chalk = require('chalk');
const commander = require('commander');
const figlet = require('figlet');
const update = require('update-notifier');

const pkg = require('../package.json');
const apexnitro = require('../lib');
const util = require('../lib/util/util');

// Close the pool cleanly if Node.js is interrupted
process
	.once('SIGTERM', () => {
		process.exit();
	})
	.once('SIGINT', () => {
		process.exit();
	});

// Print ASCII logo
console.log(chalk.magenta(figlet.textSync('APEX Nitro', {
	horizontalLayout: 'fitted'
})));

// Check for updates once a day
const notifier = update({
	packageName: pkg.name,
	packageVersion: pkg.version
});

if (notifier.update) {
	notifier.notify({
		defer: false,
		message: chalk.bold('APEX Nitro') + ' update available ' +
			chalk.dim(notifier.update.current) +
			chalk.reset(' → ') +
			chalk.green(notifier.update.latest) +
			' \nRun:\n' + chalk.cyan.bold('npm install -g apex-nitro')
	});
}

// Register CLI commands
commander
	.version(pkg.version)
	.description(pkg.description);

commander
	.command('init')
	.description('Initialize an APEX Nitro project')
	.action(() => {
		apexnitro.init();
	});

commander
	.command('launch')
	.description('Launch an APEX Nitro project')
	.action(() => {
		util.getConfig();
		apexnitro.launch();
	});

commander
	.command('publish')
	.description('Publish an APEX Nitro project')
	.action(() => {
		util.getConfig();
		apexnitro.publish();
	});

if (!process.argv.slice(2).length > 0) {
	commander.outputHelp();
	process.exit();
}

commander.parse(process.argv);
