#!/usr/bin/env node

const chalk = require('chalk');
const nopt = require('nopt');
const update = require('update-notifier');
const pkg = require('../package.json');
const nitro = require('../lib');

// Options that can be passed to commands
const options = {
	config: String,
	launch: String,
	publish: String
};

// Shorthands for the above commands
const shorthands = {
	v: '--version',
	c: 'config',
	l: 'launch',
	p: 'publish'
};

const parsed = nopt(options, shorthands);

// Cmd.args contains basic commands like "new" and "help"
// cmd.opts contains options, like --libsass and --version
const cmd = {
	args: parsed.argv.remain,
	opts: parsed
};

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

// No other arguments given
if (typeof cmd.args[0] === 'undefined') {
	if (typeof cmd.opts.version === 'undefined') {
		// Otherwise, just show the help screen
		nitro.help();
	} else {
		// If -v or --version was passed, show the version of the CLI
		process.stdout.write('APEX Nitro version ' + pkg.version + '\n');
	}
} else if (typeof nitro[cmd.args[0]] === 'undefined') {
	// Arguments given
	// If the command typed in doesn't exist, show the help screen
	nitro.help();
} else {
	// Otherwise, just run it already!
	// Every command function is passed secondary commands, and options
	// So if the user types "apex-nitro launch myApp --test",
	// "myApp" is a secondary command, and "--test" is an option
	nitro[cmd.args[0]](cmd.args.slice(1), cmd.opts);
}
