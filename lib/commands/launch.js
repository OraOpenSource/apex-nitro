/* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: true}}] */

const path = require('path');
const fs = require('fs-extra');
const browsersync = require('browser-sync').create();
const del = require('del');
const chalk = require('chalk');

const validations = require('../util/validations');
const util = require('../util/util');
const notify = require('../util/notify');

module.exports = async function (cb) {
	const config = util.getConfig();

	validations.isSrcFolderValid(config);

	if (!['basic'].includes(config.mode)) {
		del([path.resolve(config.distFolder)], {
			force: true
		}).then(() => {
			fs.ensureDirSync(path.resolve(config.distFolder));
		});
	}

	console.log(
		chalk.cyan('is compiling'),
		chalk.cyan.bold(path.resolve(config.srcFolder)),
		chalk.cyan('...')
	);

	const {buildDev} = require(path.resolve(process.cwd(), 'nitro', 'nitro-build.js'));
	await buildDev();

	console.log(chalk.cyan('...Done!'));

	if (typeof cb === 'function') {
		cb();
	} else {
		require('../util/browsersync')(config, browsersync);

		browsersync
			.watch('.', {
				cwd: path.resolve(process.cwd(), 'src'),
				ignoreInitial: true
			})
			.on('change', async file => {
				notify.changeDetected();

				await buildDev();

				if (config.browsersync.realTime) {
					if (['.css', '.less', '.sass', '.scss'].includes(path.extname(file))) {
						browsersync.reload('*.css');
						notify.injected();
					} else {
						browsersync.reload();
						notify.reloaded();
					}
				}
			});

		console.log(chalk.cyan('...Now'), chalk.cyan.bold('launching!'));
		console.log('Open up your favorite code editor and modify any file in:');
		console.log(chalk.italic(path.resolve(config.srcFolder)));
		console.log('All files in there will sync to your APEX app.');
		notify.launch();
	}
};
