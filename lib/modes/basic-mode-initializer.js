const inquirer = require('inquirer');

module.exports = class BasicModeInitializer {
	async init(config) {
		// Ask the questions for basic mode
		const basicModeQuestions = this.getQuestions();
		const basicModeConfig = await inquirer.prompt(basicModeQuestions);
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
				name: 'appURL',
				message: 'The URL of your APEX application?',
				validate: this.isRequired
			},
			{
				type: 'input',
				name: 'srcFolder',
				message: 'Location of the source folder?',
				default: './src',
				validate: this.isRequired
			}
		];
	}
};
