var chalk = require("chalk");

var helpText = {
    // Each command is an array of strings
    // To print the command, the array is joined into one string, and a line break is added
    // between each item. Basically, each comma becomes a line break.
    'default': [
        'Available commands:',
        chalk.cyan.bold('  config') + '\tConfigure an AFEB project',
        chalk.cyan.bold('  launch') + '\tLaunch an existing AFEB project',
        chalk.cyan.bold('  help  ') + '\tShow this screen',
        chalk.cyan.bold('  -v    ') + '\tDisplay current AFEB',
        '',
        'To learn more about a specific command, type ' + chalk.cyan.bold('afeb help <command>'),
        '',
        'Need more help? Ask on Github: ' + 'https://github.com/OraOpenSource/apex-frontend-boost/issues'
    ],
    'config': [
        'Usage:',
        chalk.cyan.bold('  afeb config <project>'),
        '',
        'Configure an AFEB project.',
        'It will launch a browser windows with all the available configuration fields.'
    ],
    'launch': [
        'Usage:',
        chalk.cyan.bold('  afeb launch <project>'),
        '',
        'Launch an AFEB project.',
        'Your project will be compiled and a browser window should open to your application.'
    ],
    'help': [
        'Okay, don\'t get clever. But seriously:',
        '',
        'Usage:',
        chalk.cyan.bold('  afeb help'),
        chalk.cyan.bold('  afeb help <command>'),
        '',
        'Type ' + chalk.cyan.bold('afeb help') + ' to see a list of every command,',
        'or ' + chalk.cyan.bold('afeb help <command>') + ' to learn how a specific command works.'
    ]
}

module.exports = function(args, options) {
    var command;

    if (typeof args === 'undefined' || args.length === 0 || !helpText[args[0]]) {
        command = 'default';
    } else {
        command = args[0];
    }

    // A line break is added before and after the help text for good measure
    process.stdout.write('\n' + helpText[command].join('\n') + '\n\n');
}
