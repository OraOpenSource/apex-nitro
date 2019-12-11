const inquirer = require('inquirer');

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
		config.launch.openApp = true;
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
				return answers.upload.defaults === 'custom' && answers.uploadDestination === 'plugin';
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
			name: 'launch.openApp',
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

/**
 * @exports templateCreationService
 * @description File that includes all the necessary steps during the creation of a new app
 */
module.exports = {
	initApex,
	initBrowserSync,
	initUpload
};
