/* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: true}}] */

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const uploader = require('apex-publish-static-files');
const util = require('../util/util');
const validations = require('../util/validations');
const launch = require('./launch');
const nitroService = require('../services/nitro-service');

// Validates if an object is empty (true), otherwise (false)
const getAppID = function (appUrl) {
	const parameterString = appUrl.slice(appUrl.indexOf('f?p=') + 4).split(':');
	return parameterString[0];
};

function isRequired(input) {
	if (input !== '') {
		return true;
	}

	return 'Required.';
}

module.exports = function () {
	const config = util.getConfig();

	validations.upload(config);

	// Compile and upload files
	const launchUpload = async function () {
		const upload = function () {
			uploader.publish({
				sqlclPath: config.upload.path,
				connectString: `${config.upload.username}/${config.upload.password}@${config.upload.connectionString}`,
				directory: path.resolve(config.distFolder || config.srcFolder),
				appID: getAppID(config.appUrl),
				destination: config.upload.destination,
				pluginName: config.upload.pluginName
			});
		};

		if (config.mode === 'basic') {
			launch(async () => {
				console.log(chalk.cyan('...Now'), chalk.cyan.bold('uploading!'));
				upload();
			}, {});
		} else {
			let buildResult = {
				valid: true
			};

			buildResult = await nitroService.build(config);

			if (buildResult.valid) {
				console.log(chalk.cyan('=> build complete'));
				console.log(chalk.cyan('...Now'), chalk.cyan.bold('uploading!'));
				upload();
			}
		}
	};

	/* eslint no-unused-vars: ["error", { "caughtErrors": "none" }] */

	// Validates if the srcFolder is valid
	if (validations.isSrcFolderValid(config)) {
		const questions = [];

		// If the userame is not saved in the config, let's prompt it to the user
		if (
			config.upload.username === '' ||
			typeof config.upload.username === 'undefined'
		) {
			questions.push({
				type: 'input',
				name: 'username',
				message: 'Enter database user:',
				validate: isRequired
			});
		} else {
			try {
				const filePath = path.resolve(config.upload.username);
				const isFile = fs.lstatSync(filePath).isFile();

				if (isFile) {
					const fileContent = fs.readFileSync(filePath);
					config.upload.username = fileContent.toString();
				}
			} catch {
				// Keep config.upload.username as is
			}
		}

		// If the password is not saved in the config, let's prompt it to the user
		if (
			config.upload.password === '' ||
			typeof config.upload.password === 'undefined'
		) {
			questions.push({
				type: 'password',
				name: 'password',
				message: 'Enter database password',
				validate: isRequired
			});
		} else {
			try {
				const filePath = path.resolve(config.upload.password);
				const isFile = fs.lstatSync(filePath).isFile();

				if (isFile) {
					const fileContent = fs.readFileSync(filePath);
					config.upload.password = fileContent.toString();
				}
			} catch {
				// Keep config.upload.password as is
			}
		}

		if (questions.length > 0) {
			inquirer.prompt(questions).then(answers => {
				if (answers.username) {
					config.upload.username = answers.username;
				}

				if (answers.password) {
					config.upload.password = answers.password;
				}

				launchUpload();
			});
		} else {
			launchUpload();
		}
	}
};
