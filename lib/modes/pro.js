const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const templateService = require('../services/template-service');
const nitroService = require('../services/nitro-service');
const npmService = require('../services/npm-service');

module.exports = class ProModeInitializer {
	constructor() {
		this.appPath = process.cwd();
		this.appName = path.basename(this.appPath).replace(/\s/g, '');
		this.templateName = '';
		this.repositoryUrl = '';
	}

	// Method to initialize a new pro app
	async init(config) {
		// If git has been selected, set git url to load as template name
		if (config.template === 'git') {
			this.repositoryUrl = templateService.getNpmInstallUrlFromGitUrl(
				config.gitUrl
			);
			this.templateName = templateService.getTemplateNameFromGitUrl(
				config.gitUrl
			);
		} else {
			this.templateName = config.template;
			this.repositoryUrl = null;
		}

		// Install the template to node_modules
		await npmService.installPackage(
			this.repositoryUrl || this.templateName,
			this.getTempPath()
		);

		// Copy the files from node_modules to the current directory
		await fs.copy(path.join(this.getTemplatePath(), 'template'), this.appPath);


		// Initialize the template
		const templateConfig = await templateService.initTemplate(
			path.join(this.getTemplatePath(), 'init.js'),
			this.getBasicAppInfo()
		);

		// Get nitro configs
		const apexConfig = await nitroService.initApex();
		const browserSyncConfig = await nitroService.initBrowserSync();
		const uploadConfig = await nitroService.initUpload();

		// Save configuration files
		const finalConfig = {
			...config,
			...templateConfig,
			...apexConfig,
			...browserSyncConfig,
			...uploadConfig
		};

		if (finalConfig.cssExtensions.includes('css')) {
			finalConfig.mainCss = "./src/main.css";
			await fs.writeFile(
				path.resolve(process.cwd(), finalConfig.srcFolder, `main.css`), `body {
  background-color: #fff;
}`
			);
		}

		if (finalConfig.cssExtensions.includes('scss')) {
			finalConfig.mainCss = "./src/main.scss";
			await fs.writeFile(
				path.resolve(process.cwd(), finalConfig.srcFolder, `main.scss`), `@import "scss/file1";

body {
	background-color: #fff;
}`
			);
			await fs.ensureDir(path.resolve(process.cwd(), finalConfig.srcFolder, 'scss'));
			await fs.writeFile(
				path.resolve(process.cwd(), finalConfig.srcFolder, 'scss', `file1.scss`), `.file1 {
	background-color: #fff;
}`
			);
		}

		if (finalConfig.cssExtensions.includes('less')) {
			finalConfig.mainCss = "./src/main.less";
			await fs.writeFile(
				path.resolve(process.cwd(), finalConfig.srcFolder, `main.less`), `@import "less/file1";

body {
	background-color: #fff;
}`
			);
			await fs.ensureDir(path.resolve(process.cwd(), finalConfig.srcFolder, 'less'));
			await fs.writeFile(
				path.resolve(process.cwd(), finalConfig.srcFolder, 'less', `file1.less`), `.file1 {
	background-color: #fff;
}`
			);
		}

		if (finalConfig.cssExtensions.includes('styl')) {
			finalConfig.mainCss = "./src/main.styl";
			await fs.writeFile(
				path.resolve(process.cwd(), finalConfig.srcFolder, `main.styl`), `@import "styl/file1";

body
	background-color: #fff`
			);
			await fs.ensureDir(path.resolve(process.cwd(), finalConfig.srcFolder, 'styl'));
			await fs.writeFile(
				path.resolve(process.cwd(), finalConfig.srcFolder, 'styl', `file1.styl`), `.file1
	background-color: #fff`
			);
		}

		await fs.writeFile(
			path.resolve(process.cwd(), 'apexnitro.config.json'),
			JSON.stringify(finalConfig, null, 2)
		);
		console.log(
			`${path.resolve(process.cwd(), 'apexnitro.config.json')} ${chalk.green(
				'created'
			)}.`
		);

		await fs.writeFile(
			path.resolve(process.cwd(), 'apexnitro.cred.json'),
			JSON.stringify(
				{
					path: 'sql',
					username: 'your_username',
					password: 'your_password',
					connectionString: 'your_connection_string'
				},
				null,
				2
			)
		);
		console.log(
			`${path.resolve(process.cwd(), 'apexnitro.cred.json')} ${chalk.green(
				'created'
			)}.`
		);

		const file = path.resolve(process.cwd(), '.gitignore');
		const fileExists = await fs.pathExists(file);

		if (fileExists) {
			await fs.appendFile(file, '\napexnitro.cred.json');
			console.log(`${path.resolve(process.cwd(), '.gitignore')} ${chalk.green('updated')}.`);
		} else {
			await fs.writeFile(file, 'apexnitro.cred.json');
			console.log(`${path.resolve(process.cwd(), '.gitignore')} ${chalk.green('created')}.`);
		}

		await npmService.installDependencies(finalConfig, this.appPath);

		await fs.remove(this.getTempPath());
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
