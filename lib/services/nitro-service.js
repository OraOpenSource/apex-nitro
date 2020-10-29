const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const npmService = require('./npm-service');

const initApex = async () => {
	const apexQuestions = getApexQuestions();

	// Get browsersync config
	const apexConfig = await inquirer.prompt(apexQuestions);

	return apexConfig;
};

const initBrowserSync = async () => {
	const browserSyncQuestions = getBrowsersyncQuestions();

	// Get browsersync config
	const config = await inquirer.prompt(browserSyncQuestions);

	// Set browsersync defaults
	if (config.launch.defaults === 'default') {
		config.launch.port = 4000;
		config.launch.ghostMode = false;
		config.launch.notify = true;
		config.launch.open = true;
		config.launch.openBuilder = false;
		delete config.launch.defaults;
	}

	return config;
};

const initUpload = async () => {
	const uploadQuestions = getUploadQuestions();

	// Get upload config
	const config = await inquirer.prompt(uploadQuestions);

	// Set upload defaults
	if (config.upload.defaults === 'default') {
		config.upload.destination = 'application';
		delete config.upload.defaults;
	}

	config.upload.credentialsPath = './apexnitro.cred.json';

	return config;
};

const getApexQuestions = () => {
	return [
		{
			type: 'input',
			name: 'appUrl',
			message: 'The URL of your APEX app',
			validate: isRequired
		}
	];
};

const getUploadQuestions = () => {
	return [
		{
			type: 'list',
			name: 'upload.defaults',
			message: 'Configure upload settings',
			choices: [
				{
					name: 'Use APEX Nitro default upload settings',
					value: 'default'
				},
				{
					name: 'Customize',
					value: 'custom'
				}
			],
			default: 'default'
		},
		{
			type: 'list',
			name: 'upload.destination',
			message: 'Choose where to upload your files in APEX',
			choices: [
				{
					name: 'Application static files (default)',
					value: 'application'
				},
				{
					name: 'Workspace static files',
					value: 'workspace'
				},
				{
					name: 'Theme files',
					value: 'theme'
				},
				{
					name: 'Plugin files',
					value: 'plugin'
				}
			],
			default: 'application',
			when(answers) {
				return answers.upload.defaults === 'custom';
			}
		},
		{
			type: 'input',
			name: 'upload.pluginName',
			message: 'Plugin internal name',
			when(answers) {
				return (
					answers.upload.defaults === 'custom' &&
					answers.uploadDestination === 'plugin'
				);
			},
			validate: this.isRequired
		}
	];
};

const getBrowsersyncQuestions = () => {
	return [
		{
			type: 'list',
			name: 'launch.defaults',
			message: 'Configure browser settings',
			choices: [
				{
					name: 'Use APEX Nitro default browser settings',
					value: 'default'
				},
				{
					name: 'Customize',
					value: 'custom'
				}
			],
			default: 'default'
		},
		{
			type: 'number',
			name: 'launch.port',
			message: 'Port on which APEX Nitro will serve your files',
			default: 4000,
			when(answers) {
				return answers.launch.defaults === 'custom';
			}
		},
		{
			type: 'confirm',
			name: 'launch.ghostMode',
			message: 'Enable devices mirroring',
			default: false,
			when(answers) {
				return answers.launch.defaults === 'custom';
			}
		},
		{
			type: 'confirm',
			name: 'launch.notify',
			message: 'Enable notifications',
			default: true,
			when(answers) {
				return answers.launch.defaults === 'custom';
			}
		},
		{
			type: 'confirm',
			name: 'launch.open',
			message: 'Open APEX app when launching APEX Nitro',
			when(answers) {
				return answers.launch.defaults === 'custom';
			}
		},
		{
			type: 'confirm',
			name: 'launch.openBuilder',
			message: 'Open APEX builder when launching APEX Nitro',
			when(answers) {
				return answers.launch.defaults === 'custom';
			}
		}
	];
};

function isRequired(input) {
	if (input !== '') {
		return true;
	}

	return 'Required.';
}

const runCommand = async (webpack, webpackConfig, showErrors) => {
	return new Promise((resolve, reject) => {
		webpack(webpackConfig, (err, stats) => {
			if (err) {
				console.error(err.stack || err);
				if (err.details) {
					console.error(err.details);
				}

				reject('webpack failed');
			}

			if (showErrors && (stats.hasErrors() || stats.hasWarnings())) {
				if (stats.toString().includes('Cannot find module')
					|| (stats.toString().includes('Module not found') && stats.toString().includes(`in '${path.resolve(process.cwd())}'`))
				) {
						reject('MODULE_NOT_FOUND');
				} else {
					console.log(stats.toString({
						preset: 'errors-warnings',
						assets: false,
						modules: false,
						colors: true
					}));

					reject('has errors');
				}
			} else {
				resolve('done');
			}
		});
	});
};

/**
 * @function build
 * @returns {Promise}
 * @description Entry point for apex-nitro for building the project
 */
const build = async (config, firstAttempt = true, nomin = false) => {
	console.log(
		chalk.cyan('=> building source'),
		chalk.cyan.bold(path.resolve(config.srcFolder)),
		chalk.cyan('...')
	);

	let buildResult = {
		valid: true,
		moduleNotFound: false
	}

	const catchError = (error) => {
		buildResult.valid = false;

		if (error.code === 'MODULE_NOT_FOUND' || error === 'MODULE_NOT_FOUND') {
			buildResult.moduleNotFound = true;
		}
	};

	try {
		const webpack = require(path.resolve(process.cwd(), 'node_modules', 'webpack'));

		try {
			let webpackConfigDev = require(path.resolve(process.cwd(), 'webpack.dev'));
			await runCommand(webpack, webpackConfigDev, true);
		} catch (error) {
			catchError(error);
		}

		if (buildResult.valid && nomin === false) {
			try {
				let webpackConfigProd = require(path.resolve(process.cwd(), 'webpack.prod'));
				await runCommand(webpack, webpackConfigProd, false);
			} catch (error) {
				catchError(error);
			}
		}
	} catch (error) {
		catchError(error);
	}

	if (firstAttempt && buildResult.moduleNotFound) {
		try {
			console.log(chalk.red('Dependencies missing'));
			await npmService.installDependencies(config);
			buildResult = await build(config, false);
		} catch (error) {
			console.error(error);
		}
	}

	return buildResult;
};

module.exports = {
	initApex,
	initBrowserSync,
	initUpload,
	build
};
