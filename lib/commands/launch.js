/* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: true}}] */

const path = require('path');
const chalk = require('chalk');
const notifier = require('node-notifier');
// Const validations = require('../util/validations');
// const util = require('../util/util');

const options = require('../gulp/options');

module.exports = function (cb) {
	// Const config = util.getConfig();

	// validations.isSrcFolderValid(config);

	// TODO task clean (if not basic)

	console.log(
		chalk.cyan('is compiling'),
		// Chalk.cyan.bold(path.resolve(config.srcFolder)),
		chalk.cyan('...')
	);

	const build = require(path.resolve(process.cwd(), 'bin', 'build.js'));
	build(); // TODO AWAIT this build

	if (typeof cb === 'function') {
		cb();
	} else {
		// TODO invoke browsersync
		// TODO watch (using chokidar?)
		// notifier.notify(options.notifySuccessCSS()); TODO NOTIFY WATCH
		console.log(chalk.cyan('...Now'), chalk.cyan.bold('launching!'));
		console.log('Open up your favorite code editor and modify any file in:');
		// Console.log(chalk.italic(path.resolve(config.srcFolder)));
		console.log('All files in there will sync to your APEX app.');
		notifier.notify(options.notifyLaunch());
	}
};
