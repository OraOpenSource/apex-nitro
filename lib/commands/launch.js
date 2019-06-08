/* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: true}}] */

const path = require('path');
const fs = require('fs-extra');
const browsersync = require('browser-sync').create();
const del = require('del');
const chalk = require('chalk');
const opn = require('opn');

const validations = require('../util/validations');
const util = require('../util/util');
const notify = require('../util/notify');

let isBuilderOpened = false;

module.exports = async function (cb) {
	const config = util.getConfig();

	const openAPEXBuilder = function (protocol, host, paramString) {
		// Should only open the builder once
		if (!isBuilderOpened && config.apex.openBuilder) {
			// App 4000 is the APEX builder
			opn(
				protocol +
					'//' +
					host +
					paramString.substring(0, paramString.indexOf('f?p')) +
					'f?p=4000'
			);
			isBuilderOpened = true;
		}
	};

	const apexProxyReq = function (req, res) {
		openAPEXBuilder(req.agent.protocol, res.headers.host, req.path);
		req.setHeader('Origin', req.agent.protocol + '//' + req._headers.host);
		req.setHeader('APEX-Nitro', '//' + res.headers.host + '/');
	};

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

	const build = require(path.resolve(process.cwd(), 'nitro', 'build-phases.js'));

	let lintValid = await build.lint();

	if (lintValid) {
		await build.bundleDev();
		await build.bundleProd();

		console.log(chalk.cyan('...Done!'));

		if (typeof cb === 'function') {
			cb();
		} else {
			// Launch
			browsersync.init(
				{
					logPrefix: 'APEX Nitro',
					port: config.browsersync.port || 4000,
					notify: false,
					cors: true,
					proxy: {
						target: config.appUrl,
						proxyReq: [apexProxyReq]
					},
					serveStatic: [path.resolve(config.distFolder || config.srcFolder)],
					ui: false,
					ghostMode: config.browsersync.ghostMode,
					snippetOptions: {
						// Ignores all APEX builder apps
						blacklist: [
							'**/f?p=4000:*',
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
				}
			);

			// Watch
			browsersync
				.watch('.', {
					cwd: path.resolve(config.srcFolder),
					ignoreInitial: true
				})
				.on('all', async file => {
					console.log(file);
					notify.changeDetected();

					lintValid = await build.lint();

					if (lintValid) {
						await build.bundleDev();
						await build.bundleProd();

						if (config.browsersync.realTime) {
							if (['.css', '.less', '.sass', '.scss'].includes(path.extname(file))) {
								notify.injected();
								browsersync.reload('*.css');
							} else {
								notify.reloaded();
								browsersync.reload();
							}
						}
					} else {
						notify.error();
					}
				});

			console.log(chalk.cyan('...Now'), chalk.cyan.bold('launching!'));
			console.log('Open up your favorite code editor and modify any file in:');
			console.log(chalk.italic(path.resolve(config.srcFolder)));
			console.log('All files in there will sync to your APEX app.');
			notify.launch();
		}
	}
};
