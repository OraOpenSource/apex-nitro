/* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: true}}] */

const path = require('path');
const fs = require('fs-extra');
const browsersync = require('browser-sync').create();
const del = require('del');
const chalk = require('chalk');
const open = require('open');

const validations = require('../util/validations');
const util = require('../util/util');
const notify = require('../util/notify');

let isBuilderOpened = false;

module.exports = async function (cb) {
	const config = util.getConfig();

	const openAPEXBuilder = function (protocol, host, paramString) {
		// Should only open the builder once
		if (!isBuilderOpened && config.launch.openBuilder) {
			// App 4000 is the APEX builder
			open(
				protocol +
					'//' +
					host +
					paramString.slice(0, paramString.indexOf('f?p')) +
					'f?p=4000'
			);
			isBuilderOpened = true;
		}
	};

	const apexProxyReq = function (req, res) {
		openAPEXBuilder(req.agent.protocol, res.headers.host, req.path);
		req.setHeader('Origin', req.agent.protocol + '//' + req.connection._host);
		req.setHeader('APEX-Nitro', '//' + res.headers.host + '/');
	};

	const launch = function () {
		const browsersyncOptions = {
			logPrefix: 'APEX Nitro',
			port: config.launch.port || 4000,
			notify: false,
			cors: true,
			proxy: {
				target: config.appUrl,
				proxyReq: [apexProxyReq]
			},
			serveStatic: [path.resolve(config.distFolder || config.srcFolder)],
			ui: false,
			ghostMode: config.launch.ghostMode,
			snippetOptions: {
				// Ignores all APEX builder apps
				blacklist: [
					'**/f?p=4000:*',
					'**/f?p=4020:*',
					'**/f?p=4050:*',
					'**/f?p=4155:*',
					'**/f?p=4300:*',
					'**/f?p=4350:*',
					'**/f?p=4400:*',
					'**/f?p=4411:*',
					'**/f?p=4500:*',
					'**/f?p=4550:*',
					'**/f?p=4700:*',
					'**/f?p=4750:*',
					'**/f?p=4800:*',
					'**/f?p=4850:*',
					'**/f?p=4900:*'
				]
			}
		};

		if (config.launch.openApp || typeof config.launch.openApp === 'undefined') {
			// BrowsersyncOptions.open = true;
		} else {
			browsersyncOptions.open = false;
		}

		// Launch
		browsersync.init(browsersyncOptions);

		// Watch
		browsersync
			.watch('.', {
				cwd: path.resolve(config.srcFolder),
				ignoreInitial: true
			})
			.on('all', async (event, file) => {
				notify.changeDetected();
				let buildValid = true;

				if (config.mode !== 'basic') {
					buildValid = await build();
				}

				if (buildValid) {
					if (['.css', '.less', '.sass', '.scss'].includes(path.extname(file))) {
						notify.injected();
						browsersync.reload('*.css');
					} else {
						notify.reloaded();
						browsersync.reload();
					}
				}
			});

		console.log(chalk.cyan('...Now'), chalk.cyan.bold('launching!'));
		console.log(`Open up your favorite code editor to ${chalk.bold(path.resolve(config.srcFolder))}`);
		console.log('Any change you make is synchronized to your APEX app in real time.');
		notify.launch();
	};

	const build = async function () {
		const {build} = require(path.resolve(process.cwd(), 'nitro', 'build.js'));

		const buildValid = await build();
		return buildValid;
	};

	validations.isSrcFolderValid(config);

	if (config.mode !== 'basic') {
		del([path.resolve(config.distFolder)], {
			force: true
		}).then(() => {
			fs.ensureDirSync(path.resolve(config.distFolder));
		});
	}

	if (config.mode === 'basic') {
		if (typeof cb === 'function') {
			console.log(chalk.cyan(`Your project is using ${chalk.cyan.bold('Basic')} mode, so there is nothing to build.`));
			console.log(chalk.cyan(`Change your project to ${chalk.cyan.bold('Pro')} mode or execute ${chalk.cyan.bold('apex-nitro launch')}.`));
			cb();
		} else {
			launch();
		}
	} else {
		console.log(
			chalk.cyan('is building'),
			chalk.cyan.bold(path.resolve(config.srcFolder)),
			chalk.cyan('...')
		);

		const buildValid = await build();

		if (buildValid) {
			console.log(chalk.cyan('...Done!'));

			if (typeof cb === 'function') {
				cb();
			} else {
				launch();
			}
		}
	}
};
