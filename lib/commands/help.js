'use strict';

const chalk = require('chalk');

const helpText = {
	// Each command is an array of strings
	// To print the command, the array is joined into one string, and a line break is added
	// between each item. Basically, each comma becomes a line break.
	default: [
		'Available commands:',
		chalk.cyan.bold('  config') + '\tConfigure an APEX Nitro project',
		chalk.cyan.bold('  launch') + '\tLaunch an existing APEX Nitro project',
		chalk.cyan.bold('  list  ') + '\tLists all available projects',
		chalk.cyan.bold('  publish') + '\tPublish your files directly to APEX',
		chalk.cyan.bold('  help  ') + '\tShow this screen',
		chalk.cyan.bold('  -v    ') + '\tDisplay current APEX Nitro version',
		'',
		'To learn more about a specific command, type ' + chalk.cyan.bold('apex-nitro help <command>'),
		'',
		'Need more help? Ask on Github: https://github.com/OraOpenSource/apex-frontend-boost/issues'
	],
	config: [
		'Usage:',
		chalk.cyan.bold('  apex-nitro config <project>'),
		'',
		'Configure an APEX Nitro project.',
		'It will launch a browser windows with all the available configuration fields.'
	],
	launch: [
		'Usage:',
		chalk.cyan.bold('  apex-nitro launch <project>'),
		'',
		'Launch an APEX Nitro project.',
		'Your project will be compiled and a browser window should open to your application.'
	],
	list: [
		'Usage:',
		chalk.cyan.bold('  apex-nitro list'),
		'',
		'Lists all available projects.',
		'Then, use these projects with ' + chalk.cyan.bold('apex-nitro launch <project>') + ' or ' + chalk.cyan.bold('apex-nitro config <project>') + ' or ' + chalk.cyan.bold('apex-nitro publish <project>')
	],
	publish: [
		'Usage:',
		chalk.cyan.bold('  apex-nitro publish <project>'),
		'',
		'Takes every file from your "dist" folder and inserts them into your Shared Components - Application Static Files.'
	],
	help: [
		'Okay, don\'t get clever. But seriously:',
		'',
		'Usage:',
		chalk.cyan.bold('  apex-nitro help'),
		chalk.cyan.bold('  apex-nitro help <command>'),
		'',
		'Type ' + chalk.cyan.bold('apex-nitro help') + ' to see a list of every command,',
		'or ' + chalk.cyan.bold('apex-nitro help <command>') + ' to learn how a specific command works.'
	]
};

module.exports = function (args) {
	let command;

	if (typeof args === 'undefined' || args.length === 0 || !helpText[args[0]]) {
		command = 'default';
	} else {
		command = args[0];
	}

	// A line break is added before and after the help text for good measure
	process.stdout.write('\n' + helpText[command].join('\n') + '\n\n');
};
