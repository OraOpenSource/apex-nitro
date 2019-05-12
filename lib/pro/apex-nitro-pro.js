const path = require('path');
const inquirer = require('inquirer');
const templateService = require('./services/template-service');

class ApexNitroPro {
	constructor() {
		this.appPath = process.cwd();
		this.appName = path.basename(this.appPath);
		this.templateName = '';
		this.repositoryUrl = '';
	}

	// Questions to setup the pro template
	getQuestions() {
		return [
			{
				type: 'list',
				name: 'template',
				message: 'What template to you want to use?',
				choices: [
					{
						name: 'JavaScript library template',
						value: 'apexjs-template-js-lib'
					},
					{
						name: 'Custom template from a Git repository',
						value: 'git'
					}
				],
				default: 'js'
			},
			{
				type: 'input',
				name: 'gitUrl',
				message: 'Enter the URL of the Git repository:',
				validate: input => (input === '' ? 'Required' : true),
				when(answers) {
					return answers.template === 'git';
				}
			}
		];
	}

	// Method to initialize a new pro app
	async init() {
		// Ask questions
		const questions = this.getQuestions();
		const answers = await inquirer.prompt(questions);

		// If git has been selected, set git url to load as template name
		if (answers.template === 'git') {
			const protocol = answers.gitUrl.match(/[https|ssh]+/i)[0];
			this.repositoryUrl = `git+${protocol}://git@${answers.gitUrl.replace(
				protocol + '://',
				''
			)}`;
			this.templateName = answers.gitUrl
				.split('/')
				.pop()
				.split('.')[0];
		} else {
			this.templateName = answers.template;
			this.repositoryUrl = null;
		}

		// Install the template anc copy the files to the current directory
		await templateService.installTemplate(
			this.repositoryUrl || this.templateName,
			this.getTempPath()
		);
		templateService.copyFilesSync(this.getTemplatePath(), this.appPath);

		// Install dependencies
		await templateService.installDependencies(this.appPath);

		// Initialize the template
		const proConfig = await templateService.initTemplate(this.getBasicAppInfo());

		// Remove temp directory
		await templateService.remove(this.getTempPath());

		return proConfig;
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
}
module.exports = ApexNitroPro;
