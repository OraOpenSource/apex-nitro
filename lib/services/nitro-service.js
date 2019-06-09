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
	const browserSyncConfig = await inquirer.prompt(browserSyncQuestions);

	// Set browsersync defaults
	if (browserSyncConfig.browsersync.defaults === 'default') {
		browserSyncConfig.browsersync.port = 4000;
		browserSyncConfig.browsersync.realTime = true;
		browserSyncConfig.browsersync.ghostMode = false;
		browserSyncConfig.browsersync.notify = true;
		browserSyncConfig.apex = {};
		browserSyncConfig.apex.openBuilder = false;
		delete browserSyncConfig.browsersync.defaults;
	}

	return browserSyncConfig;
};

const initPublish = async (publishQuestions) => {
	const publishQuestions = getPublishQuestions();

	// Get publish config
	const publishConfig = await inquirer.prompt(publishQuestions);

	// Set publish defaults
	if (publishConfig.publish.defaults === 'default') {
		publishConfig.publish.destination = 'application';
		publishConfig.publish.path = 'sqlcl';
		publishConfig.publish.username = '';
		publishConfig.publish.password = '';
		publishConfig.publish.connectionString = '';
		delete publishConfig.publish.defaults;
	} else if (publishConfig.publish.password !== '') {
		publishConfig.publish.password = '***************';
	}

	return publishConfig;
};

const getApexQuestions = () => {
	return [
		{
			type: 'input',
			name: 'app-url',
			message: 'The URL of your APEX application?',
			validate: isRequired
		}
	];
};

const getPublishQuestions = () => {
	return [
		{
			type: 'list',
			name: 'publish.defaults',
			message: 'Configure publish settings',
			choices: [
				{
					name: 'Use APEX Nitro default publish settings',
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
			name: 'publish.destination',
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
				return answers.publish.defaults === 'custom';
			}
		},
		{
			type: 'input',
			name: 'publish.pluginName',
			message: 'Plugin internal name?',
			when(answers) {
				return answers.publish.defaults === 'custom' && answers.publishDestination === 'plugin';
			},
			validate: this.isRequired
		},
		{
			type: 'input',
			name: 'publish.path',
			message: 'Path to SQLcl?',
			default: 'sqlcl',
			when(answers) {
				return answers.publish.defaults === 'custom';
			},
			validate: this.isRequired
		},
		{
			type: 'input',
			name: 'publish.username',
			message: 'Enter database user:',
			when(answers) {
				return answers.publish.defaults === 'custom';
			},
			validate: this.isRequired
		},
		{
			type: 'password',
			name: 'publish.password',
			message: 'Enter database password (optional):',
			when(answers) {
				return answers.publish.defaults === 'custom';
			}
		},
		{
			type: 'input',
			name: 'publish.connectionString',
			message: 'Enter database connection string:',
			when(answers) {
				return answers.publish.defaults === 'custom';
			},
			validate: this.isRequired
		}
	];
};

const getBrowsersyncQuestions = () => {
	return [
		{
			type: 'list',
			name: 'browsersync.defaults',
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
			name: 'browsersync.port',
			message: 'Port on which APEX Nitro will serve your files?',
			default: 4000,
			when(answers) {
				return answers.browsersync.defaults === 'custom';
			}
		},
		{
			type: 'confirm',
			name: 'browsersync.realTime',
			message: 'Enable real-time synchronization?',
			default: true,
			when(answers) {
				return answers.browsersync.defaults === 'custom';
			}
		},
		{
			type: 'confirm',
			name: 'browsersync.ghostMode',
			message: 'Enable external devices synchronization?',
			default: false,
			when(answers) {
				return answers.browsersync.defaults === 'custom';
			}
		},
		{
			type: 'confirm',
			name: 'browsersync.notify',
			message: 'Enable notifications on success and error builds?',
			default: true,
			when(answers) {
				return answers.browsersync.defaults === 'custom';
			}
		},
		{
			type: 'confirm',
			name: 'apex.openBuilder',
			message: 'Open APEX builder when launching APEX Nitro?',
			when(answers) {
				return answers.browsersync.defaults === 'custom';
			}
		}
	];
};

/**
 * @exports templateCreationService
 * @description File that includes all the necessary steps during the creation of a new app
 */
module.exports = {
	initApex,
	initBrowserSync,
	initPublish
};
