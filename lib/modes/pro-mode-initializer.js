const path = require('path');
const templateService = require('../services/template-service');

module.exports = class ProModeInitializer {
	constructor() {
		this.appPath = process.cwd();
		this.appName = path.basename(this.appPath);
		this.templateName = '';
		this.repositoryUrl = '';
	}

	// Method to initialize a new pro app
	async init(config) {
		// If git has been selected, set git url to load as template name
		if (config.mode === 'git') {
			this.repositoryUrl = templateService.getNpmInstallUrlFromGitUrl(config.gitUrl);
			this.templateName = templateService.getTemplateNameFromGitUrl(config.gitUrl);
		} else {
			this.templateName = config.mode;
			this.repositoryUrl = null;
		}

		// Install the template anc copy the files to the current directory
		await templateService.installTemplate(
			this.repositoryUrl || this.templateName,
			this.getTempPath()
		);
		templateService.copyFilesSync(path.join(this.getTemplatePath(), 'template'), this.appPath);

		// Install dependencies
		await templateService.installDependencies(this.appPath);

		// Initialize the template
		const proConfig = await templateService.initTemplate(
			path.join(this.getTemplatePath(), 'init.js'),
			this.getBasicAppInfo()
		);

		// Get browsersync config
		const browserSyncQuestions = this.getBrowsersyncQuestions();
		const browserSyncConfig = await templateService.initBrowserSync(browserSyncQuestions);

		// Get publish config
		const publishQuestions = this.getPublishQuestions();
		const publishConfig = await templateService.initPublish(publishQuestions);

		// Remove temp directory
		await templateService.remove(this.getTempPath());

		return {...config, ...proConfig, ...browserSyncConfig, ...publishConfig};
	}

	// Returns the path of the temp folder within the app directory. This is used for the installation of the template.
	getTempPath() {
		return path.join(this.appPath, 'temp');
	}

	// Returns the path of the template directory within the installed template package
	getTemplatePath() {
		return path.join(this.getTempPath(), 'node_modules', this.templateName);
	}

	// This information is passed to the template for further initialization of the template itself
	getBasicAppInfo() {
		return {
			appName: this.appName,
			appPath: this.appPath,
			suppressInquiry: false
		};
	}

	getBrowsersyncQuestions() {
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
				message: 'Enable push notifications on success and errors?',
				default: false,
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
	}

	getPublishQuestions() {
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
					return (
						answers.publish.defaults === 'custom' &&
						answers.publishDestination === 'plugin'
					);
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
	}
};
