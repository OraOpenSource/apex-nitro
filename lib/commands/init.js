const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const BasicModeInitializer = require('../modes/basic-mode-initializer');
const AdvancedModeInitializer = require('../modes/advanced-mode-initializer');
const ProModeInitializer = require('../modes/pro-mode-initializer');

module.exports = function() {
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

const initConfig = async function() {
	let config = await inquirer.prompt(modeQuestions);

	if (config.mode === 'basic') {
		basicModeInitializer = new BasicModeInitializer();
		config = await basicModeInitializer.init(config);
		await writeConfig(config);
	} else if (config.mode === 'advanced') {
		const advancedModeInitializer = new AdvancedModeInitializer();
		config = await advancedModeInitializer.init(config);
		await writeConfig(config);
		await AdvancedModeInitializer.initFiles(config);
	} else {
		const proModeInitializer = new ProModeInitializer();
		config = await proModeInitializer.init(config);
		await writeConfig(config);
	}

	console.log(`Now type ${chalk.bold.cyan('apex-nitro launch')}`);
};

const writeConfig = async function(config) {
	const display = JSON.parse(JSON.stringify(config));

	// Display the config for confirmation
	console.log(`About to write to ${process.cwd()}/apexnitro.config.json:`);
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
			JSON.stringify(config, null, 2),
			'utf8',
			() => {
				console.log(`${process.cwd()}/apexnitro.config.json ${chalk.green('saved')}.`);
			}
		);
	}
};

const modeQuestions = [
	{
		type: 'list',
		name: 'mode',
		message: 'Which mode?',
		choices: [
			{
				name: 'Basic',
				value: 'basic'
			},
			{
				name: 'Advanced',
				value: 'advanced'
			},
			{
				name: 'Pro - JavaScript library',
				value: 'apex-nitro-template-js'
			},
			{
				name: 'Pro - Custom template from Git repository',
				value: 'git'
			}
		]
	},
	{
		type: 'input',
		name: 'gitUrl',
		message: 'Enter the URL of the Git repository:',
		validate: input => (input === '' ? 'Required' : true),
		when(answers) {
			return answers.mode === 'git';
		}
	}
];
