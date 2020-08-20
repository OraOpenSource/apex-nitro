const path = require('path');
const inquirer = require('inquirer');

module.exports = class BasicModeInitializer {
	async init(config) {
		// Ask the questions for basic mode
		const basicModeQuestions = this.getQuestions();
		const basicModeConfig = await inquirer.prompt(basicModeQuestions);
		basicModeConfig.srcFolder = './src';

		// Default launch config
		basicModeConfig.launch = {};
		basicModeConfig.launch.port = 4000;
		basicModeConfig.launch.ghostMode = false;
		basicModeConfig.launch.notify = true;
		basicModeConfig.launch.open = true;
		basicModeConfig.launch.openBuilder = false;

		// Default upload config
		basicModeConfig.upload = {};
		basicModeConfig.upload.destination = 'application';
		basicModeConfig.upload.credentialsPath = './apexnitro.cred.json';

		return {...config, ...basicModeConfig};
	}

	isRequired(input) {
		if (input !== '') {
			return true;
		}

		return 'Required.';
	}

	getQuestions() {
		return [
			{
				type: 'input',
				name: 'appName',
				message: 'The name of your project',
				default: path.basename(process.cwd()).replace(/\s/g, ''),
				validate: input => {
					if (/^([A-Za-z\d])+$/.test(input)) {
						return true;
					}

					return 'May only include letters and numbers.';
				}
			},
			{
				type: 'input',
				name: 'appUrl',
				message: 'The URL of your APEX app',
				validate: this.isRequired
			}
		];
	}
};
