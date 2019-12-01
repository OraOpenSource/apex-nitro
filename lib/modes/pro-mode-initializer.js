const path = require('path');
const fs = require('fs-extra');
const ora = require('ora');
const templateService = require('../services/template-service');
const nitroService = require('../services/nitro-service');

module.exports = class ProModeInitializer {
	constructor() {
		this.appPath = process.cwd();
		this.appName = path.basename(this.appPath).replace(/\s/g, '');
		this.templateName = '';
		this.repositoryUrl = '';
	}

	// Method to initialize a new pro app
	async init(config, configFileName) {
		// If git has been selected, set git url to load as template name
		if (config.template === 'git') {
			this.repositoryUrl = templateService.getNpmInstallUrlFromGitUrl(config.gitUrl);
			this.templateName = templateService.getTemplateNameFromGitUrl(config.gitUrl);
		} else {
			this.templateName = config.template;
			this.repositoryUrl = null;
		}

		// Install the template anc copy the files to the current directory
		let spinner = ora(`Preparing project "${this.appName}"`).start();
		await templateService.installTemplate(
			this.repositoryUrl || this.templateName,
			this.getTempPath()
		);
		templateService.copyFilesSync(path.join(this.getTemplatePath(), 'template'), this.appPath);
		spinner.succeed();

		// Initialize the template
		const templateConfig = await templateService.initTemplate(
			path.join(this.getTemplatePath(), 'init.js'),
			this.getBasicAppInfo()
		);

		// Get nitro configs
		const apexConfig = await nitroService.initApex();
		const browserSyncConfig = await nitroService.initBrowserSync();
		const publishConfig = await nitroService.initPublish();

		// Save configuration to file
		spinner = ora(`Saving configuration to "${configFileName}"`).start();
		const finalConfig = {
			...config,
			...templateConfig,
			...apexConfig,
			...browserSyncConfig,
			...publishConfig
		};
		await fs.writeFile(
			path.resolve(process.cwd(), 'apexnitro.config.json'),
			JSON.stringify(finalConfig, null, 2),
			'utf8'
		);
		spinner.succeed();

		// Install dependencies and remove temp directory
		spinner = ora('Installing dependencies').start();
		await templateService.installDependencies(this.appPath);
		if (templateConfig.cssExtensions && templateConfig.cssExtensions.length > 1) {
			await templateService.installCssPreprocessors(templateConfig.cssExtensions);
		}

		await templateService.remove(this.getTempPath());
		spinner.succeed();
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
			appPath: this.appPath
		};
	}
};
