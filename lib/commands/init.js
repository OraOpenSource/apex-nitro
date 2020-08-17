const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const BasicModeInitializer = require('../modes/basic-mode-initializer');
const ProModeInitializer = require('../modes/pro-mode-initializer');

module.exports = function () {
	/* eslint no-unused-vars: ["error", { "caughtErrors": "none" }] */

	try {
		require(path.resolve(process.cwd(), 'apexnitro.config.json'));

		const confirmResetQuestion = [
			{
				type: 'confirm',
				name: 'resetConfig',
				message: 'A configuration file already exists here. Do you want to reset it?',
				default: false
			}
		];
		// Ask if config should be overwritten
		inquirer.prompt(confirmResetQuestion).then(answers => {
			if (answers.resetConfig) {
				initConfig();
			}
		});
	} catch (error) {
		// No config files exists currently
		initConfig();
	}
};

const initConfig = async function () {
	let config = await inquirer.prompt(modeQuestions);

	if (config.mode === 'basic') {
		const basicModeInitializer = new BasicModeInitializer();
		config = await basicModeInitializer.init(config);
		await writeConfig(config);
		await fs.ensureDir(path.resolve(process.cwd(), config.srcFolder));
		await fs.writeFile(
			path.resolve(process.cwd(), config.srcFolder, `${config.appName}.js`), `/**
* @namespace ${config.appName}
**/
var ${config.appName} = ${config.appName} || {};

/**
* @module p1
**/
${config.appName}.p1 = {
	/**
	* @function init
	* @example ${config.appName}.p1.init();
	**/
	init: function () {
		alert('Hello World');
	}
};

$(document).ready(function () {
  ${config.appName}.p1.init();
});`
		);
		await fs.writeFile(
			path.resolve(process.cwd(), config.srcFolder, `${config.appName}.css`), `.t-Body-content {
	background-color: #21D4FD;
	background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%);
}`
		);
	} else if (config.mode === 'pro') {
		const proModeInitializer = new ProModeInitializer();
		await proModeInitializer.init(config, 'apexnitro.config.json');
	} else {
		throw new Error(`Unknown mode "${config.mode}"`);
	}

	console.log(`\nNow type ${chalk.bold.cyan('apex-nitro launch')}`);
};

const writeConfig = async function (config) {
	const display = JSON.parse(JSON.stringify(config));
	delete display.browsersync;
	delete display.apex;
	delete display.upload;
	delete display.srcFolder;

	// Display the config for confirmation
	console.log(`About to write to ${path.resolve(process.cwd(), 'apexnitro.config.json')}:`);
	console.log(JSON.stringify(display, null, 2));

	const confirmQuestions = [
		{
			type: 'confirm',
			name: 'initConfirm',
			message: 'Is this OK'
		}
	];

	// Confirm the config file
	const confirmAnswer = await inquirer.prompt(confirmQuestions);

	if (confirmAnswer.initConfirm) {
		await fs.writeFile(
			path.resolve(process.cwd(), 'apexnitro.config.json'),
			JSON.stringify(config, null, 2)
		);
		console.log(`${path.resolve(process.cwd(), 'apexnitro.config.json')} ${chalk.green('created')}.`);

		await fs.writeFile(
			path.resolve(process.cwd(), 'apexnitro.cred.json'),
			JSON.stringify({
				path: 'sql',
				username: 'your_username',
				password: 'your_password',
				connectionString: 'your_connection_string'
			}
			, null, 2)
		);
		console.log(`${path.resolve(process.cwd(), 'apexnitro.cred.json')} ${chalk.green('created')}.`);

		await fs.writeFile(
			path.resolve(process.cwd(), '.gitignore'),
			'apexnitro.cred.json'
		);
		console.log(`${path.resolve(process.cwd(), '.gitignore')} ${chalk.green('created')}.`);
	}
};

const modeQuestions = [
	{
		type: 'list',
		name: 'mode',
		message: 'Pick a mode',
		choices: [
			{
				name: 'Basic (recommended for first time users)',
				value: 'basic'
			},
			{
				name: 'Pro (recommended for the best experience)',
				value: 'pro'
			}
		]
	},
	{
		type: 'list',
		name: 'template',
		message: 'Pick a Pro template',
		choices: [
			{
				name: 'JavaScript (default)',
				value: 'apex-nitro-template-js'
			},
			{
				name: 'React (beta)',
				value: 'apex-nitro-template-react'
			},
			{
				name: 'Custom Git repository',
				value: 'git'
			}
		],
		when(answers) {
			return answers.mode === 'pro';
		}
	},
	{
		type: 'input',
		name: 'gitUrl',
		message: 'URL of the Git repository',
		validate: input => (input === '' ? 'Required' : true),
		when(answers) {
			return answers.template === 'git';
		}
	}
];
