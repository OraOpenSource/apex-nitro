const path = require("path");
const inquirer = require("inquirer");
const templateService = require("./services/templateService");

/**
 * @class ApexNitroPro
 * @description Main class for setting up a JavaScript apf for APEX
 */
class ApexNitroPro {
	constructor() {
		this.appPath = process.cwd();
		this.appName = path.basename(this.appPath);
		this.templateName;
		this.repositoryUrl;
	}

	/**
	 * @description Questions to setup the pro template
	 */
	getQuestions() {
		return [
			{
				type: "list",
				name: "template",
				message: "What template to you want to use?",
				choices: [
					{
						name: "JavaScript library template",
						value: "apexjs-template-js-lib"
					},
					{
						name: "Custom template from a Git repository",
						value: "git"
					}
				],
				default: "js"
			},
			{
				type: "input",
				name: "gitUrl",
				message: "Enter the URL of the Git repository:",
				validate: input => (input !== "" ? true : "Required"),
				when(answers) {
					return answers.template === "git";
				}
			}
		];
	}

	/**
	 * @description MMethod to initialize a new pro app
	 */
	async init() {
		// ask questions
		const questions = this.getQuestions();
		const answers = await inquirer.prompt(questions);

		// if git has been selected, set git url to load as template name
		if (answers.template === "git") {
			const protocol = answers.gitUrl.match(/[https|ssh]+/i)[0];
			this.repositoryUrl = `git+${protocol}://git@${answers.gitUrl.replace(
				protocol + "://",
				""
			)}`;
			this.templateName = answers.gitUrl
				.split("/")
				.pop()
				.split(".")[0];
		} else {
			this.templateName = answers.template;
			this.repositoryUrl = null;
		}

		// install the template anc copy the files to the current directory
		await templateService.installTemplate(
			this.repositoryUrl || this.templateName,
			this.getTempPath()
		);
		templateService.copyFilesSync(this.getTemplatePath(), this.appPath);

		// install dependencies
		await templateService.installDependencies(this.appPath);

		// initialize the template
		const proConfig = await templateService.initTemplate(this.getBasicAppInfo());

		// remove temp directory
		await templateService.remove(this.getTempPath());

		return proConfig;
	}

	/**
	 * @description returns the path of the temp folder within the app directory. This is used for the installation of the template.
	 */
	getTempPath() {
		return path.join(this.appPath, "temp");
	}
	/**
	 * @description returns the path of the template directory within the installed template package
	 */
	getTemplatePath() {
		return path.join(this.getTempPath(), "node_modules", this.templateName);
	}

	/**
	 * @description This information is passed to the template for further initialization of the template itself
	 */
	getBasicAppInfo() {
		return {
			appName: this.appName,
			appPath: this.appPath,
			suppressInquiry: false
		};
	}
}
module.exports = ApexNitroPro;
