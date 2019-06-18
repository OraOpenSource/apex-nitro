const inquirer = require('inquirer');

module.exports = class BasicModeInitializer {
	async init(config) {
		// Ask the questions for basic mode
		const basicModeQuestions = this.getQuestions();
		const basicModeConfig = await inquirer.prompt(basicModeQuestions);
		basicModeConfig.srcFolder = './src';

		// Default browsersync config
		basicModeConfig.browsersync = {};
		basicModeConfig.browsersync.port = 4000;
		basicModeConfig.browsersync.realTime = true;
		basicModeConfig.browsersync.ghostMode = false;
		basicModeConfig.browsersync.notify = true;
		basicModeConfig.apex = {};
		basicModeConfig.apex.openApp = true;
		basicModeConfig.apex.openBuilder = false;

		// Default publish config
		basicModeConfig.publish = {};
		basicModeConfig.publish.destination = 'application';
		basicModeConfig.publish.path = 'sqlcl';
		basicModeConfig.publish.username = '';
		basicModeConfig.publish.password = '';
		basicModeConfig.publish.connectionString = '';

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
				message: 'The name of your APEX application?',
				validate: this.isRequired
			},
			{
				type: 'input',
				name: 'appUrl',
				message: 'The URL of your APEX application?',
				validate: this.isRequired
			}
		];
	}
};
