#!/usr/bin/env node

var nopt = require('nopt'),
    update = require('update-notifier'),
    pkg = require('../package.json'),
    afeb = require('../lib'); 

// Options that can be passed to commands
var options = {
    "config": String,
    "launch": String,
    "publish": String
}

// Shorthands for the above commands
var shorthands = {
    "v": "--version",
    "c": "config",
    "l": "launch",
    "p": "publish"
}

var parsed = nopt(options, shorthands);

// cmd.args contains basic commands like "new" and "help"
// cmd.opts contains options, like --libsass and --version
var cmd = {
    args: parsed.argv.remain,
    opts: parsed
}

// Check for updates once a day
var notifier = update({
    packageName: pkg.name,
    packageVersion: pkg.version
});

if (notifier.update) {
    notifier.notify({
        defer: false,
        message: chalk.bold('APEX Front-End Boost') + ' update available ' +
            chalk.dim(notifier.update.current) +
            chalk.reset(' → ') +
            chalk.green(notifier.update.latest) +
            ' \nRun:\n' + chalk.cyan.bold('npm install -g apex-frontend-boost')
    });
}

// No other arguments given
if (typeof cmd.args[0] === 'undefined') {
    // If -v or --version was passed, show the version of the CLI
    if (typeof cmd.opts.version !== 'undefined') {
        process.stdout.write("APEX Front-End Boost version " + pkg.version + '\n');
    }
    // Otherwise, just show the help screen
    else {
        afeb.help();
    }
}

// Arguments given
else {
    // If the command typed in doesn't exist, show the help screen
    if (typeof afeb[cmd.args[0]] == 'undefined') {
        afeb.help();
    }
    // Otherwise, just run it already!
    else {
        // Every command function is passed secondary commands, and options
        // So if the user types "afeb launch myApp --test", "myApp" is a secondary command, and "--test" is an option
        afeb[cmd.args[0]](cmd.args.slice(1), cmd.opts);
    }
}
