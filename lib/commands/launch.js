/* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: true}}] */

const path = require('path');
const chalk = require('chalk');
const chokidar = require('chokidar');
const notifier = require('node-notifier');
// Const validations = require('../util/validations');
// const util = require('../util/util');

const options = require('../gulp/options');

module.exports = async function (cb) {
	// Const config = util.getConfig();

	// validations.isSrcFolderValid(config);

	// TODO task clean (if not basic)

	console.log(
		chalk.cyan('is compiling'),
		// Chalk.cyan.bold(path.resolve(config.srcFolder)),
		chalk.cyan('...')
	);

	const build = require(path.resolve(process.cwd(), 'bin', 'build.js'));
	await build();

	console.log(chalk.cyan('...Done!'));

	if (typeof cb === 'function') {
		cb();
	} else {
		// TODO invoke browsersync

		// TODO watch if not basic
		chokidar.watch('.', {
			cwd: path.resolve(process.cwd(), 'src'),
			ignoreInitial: true
		}).on('all', async (event, path) => {
			console.log(event, path);
			notifier.notify(options.notifyChangeDetected());
			await build();
			notifier.notify(options.notifyRecompiled());
		});

		console.log(chalk.cyan('...Now'), chalk.cyan.bold('launching!'));
		console.log('Open up your favorite code editor and modify any file in:');
		// Console.log(chalk.italic(path.resolve(config.srcFolder)));
		console.log('All files in there will sync to your APEX app.');
		notifier.notify(options.notifyLaunch());
	}
};
