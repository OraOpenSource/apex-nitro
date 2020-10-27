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

const nitroService = require('../services/nitro-service');

let isBuilderOpened = false;

module.exports = async function (cb, {nomin = false}) {
	const config = util.getConfig();

	const openAPEXBuilder = function (protocol, host, parameterString) {
		// Should only open the builder once
		if (!isBuilderOpened && config.launch.openBuilder) {
			// App 4000 is the APEX builder
			open(
				protocol +
				'//' +
				host +
				parameterString.slice(0, parameterString.indexOf('f?p')) +
				'f?p=4000'
			);
			isBuilderOpened = true;
		}
	};

	const apexProxyRequest = function (request, response) {
		openAPEXBuilder(request.agent.protocol, response.headers.host, request.path);
		request.setHeader('Origin', request.agent.protocol + '//' + (request.connection._host || request._headers.host));
		request.setHeader('APEX-Nitro', '//' + response.headers.host + '/');
	};

	const launch = () => {
		const browsersyncOptions = {
			logPrefix: 'APEX Nitro',
			port: config.launch.port || 4000,
			notify: false,
			cors: true,
			proxy: {
				target: config.appUrl,
				proxyReq: [apexProxyRequest]
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

		if (config.launch.open || typeof config.launch.open === 'undefined') {
			browsersyncOptions.open = true;
		} else {
			browsersyncOptions.open = false;
		}

		// Launch
		browsersync.init(browsersyncOptions);

		const debounce = (func, wait) => {
			let timeout;

			return function () {
				const context = this;
				const args = arguments;
				const later = function () {
					timeout = null;
					func.apply(context, args);
				};

				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
			};
		};

		const debounced = debounce(async (event, file) => {
			console.log(`"${event}" detected on ${file}`);

			notify.changeDetected();

			let buildResult = {
				valid: true
			};

			if (config.mode !== 'basic') {
				buildResult = await nitroService.build(config, true, nomin);
			}

			if (buildResult.valid) {
				if (
					['.css', '.less', '.sass', '.scss'].includes(path.extname(file))
				) {
					notify.injected();
					browsersync.reload('*.css');
				} else {
					notify.reloaded();
					browsersync.reload();
				}
			}
		}, 500);

		// Watch
		browsersync
			.watch('.', {
				cwd: path.resolve(config.srcFolder),
				ignoreInitial: true
			})
			.on('all', async (event, file) => {
				debounced(event, file);
			});

		console.log(chalk.cyan('...Now'), chalk.cyan.bold('launching!'));
		console.log(
			`Open up your favorite code editor to ${chalk.bold(
				path.resolve(config.srcFolder)
			)}`
		);
		console.log(
			'Any change you make is synchronized to your APEX app in real time.'
		);
		console.log(chalk.cyan('Watching for changes...'));
		notify.launch();
	};

	validations.isSrcFolderValid(config);

	if (config.mode === 'basic') {
		if (typeof cb === 'function') {
			console.log(
				chalk.cyan(
					`Your project is using ${chalk.cyan.bold(
						'Basic'
					)} mode, so there is nothing to build.`
				)
			);
			console.log(
				chalk.cyan(
					`Change your project to ${chalk.cyan.bold(
						'Pro'
					)} mode or execute ${chalk.cyan.bold('apex-nitro launch')}.`
				)
			);
			cb();
		} else {
			launch();
		}
	} else {
		validations.isDistFolderValid(config);

		await del([path.resolve(config.distFolder)], {
			force: true
		});

		fs.ensureDirSync(path.resolve(config.distFolder));

		let buildResult = await nitroService.build(config, true, nomin);

		if (buildResult.valid) {
			console.log(chalk.cyan('=> build complete'));

			if (typeof cb === 'function') {
				cb();
			} else {
				launch();
			}
		}
	}
};
