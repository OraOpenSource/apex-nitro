/* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: true}}] */

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const publisher = require('apex-publish-static-files');
const util = require('../util/util');
const validations = require('../util/validations');
const launch = require('./launch');

// Validates if an object is empty (true), otherwise (false)
const getAppID = function (appUrl) {
	const paramString = appUrl.substring(appUrl.indexOf('f?p=') + 4).split(':');
	return paramString[0];
};

function isRequired(input) {
	if (input !== '') {
		return true;
	}

	return 'Required.';
}

module.exports = function () {
	const config = util.getConfig();

	validations.publish(config);

	// Compile and publish files
	const launchPublish = async function () {
		const publish = function () {
			publisher.publish({
				sqlclPath: config.publish.path,
				connectString: `${config.publish.username}/${config.publish.password}@${config.publish.connectionString}`,
				directory: path.resolve(config.distFolder),
				appID: getAppID(config.appUrl),
				destination: config.publish.destination,
				pluginName: config.publish.pluginName
			});
		};

		if (config.mode === 'basic') {
			launch(async () => {
				console.log(chalk.cyan('...Now'), chalk.cyan.bold('publishing!'));
				publish();
			});
		} else {
			const { build } = require(path.resolve(process.cwd(), 'nitro', 'build.js'));
			const buildValid = await build();
			if (buildValid) {
				console.log(chalk.cyan('...Now'), chalk.cyan.bold('publishing!'));
				publish();
			}
		}
	};

	// Validates if the srcFolder is valid
	if (validations.isSrcFolderValid(config)) {
		const questions = [];

		// If the userame is not saved in the config, let's prompt it to the user
		if (config.publish.username === '' || typeof config.publish.username === 'undefined') {
			questions.push({
				type: 'input',
				name: 'username',
				message: 'Enter database user:',
				validate: isRequired
			});
		} else {
			try {
				const filePath = path.resolve(config.publish.username);
				const isFile = fs.lstatSync(filePath).isFile();

				if (isFile) {
					const fileContent = fs.readFileSync(filePath);
					config.publish.username = fileContent.toString();
				}
			} catch (error) {
				// Keep config.publish.username as is
			}
		}

		// If the password is not saved in the config, let's prompt it to the user
		if (config.publish.password === '' || typeof config.publish.password === 'undefined') {
			questions.push({
				type: 'password',
				name: 'password',
				message: 'Enter database password',
				validate: isRequired
			});
		} else {
			try {
				const filePath = path.resolve(config.publish.password);
				const isFile = fs.lstatSync(filePath).isFile();

				if (isFile) {
					const fileContent = fs.readFileSync(filePath);
					config.publish.password = fileContent.toString();
				}
			} catch (error) {
				// Keep config.publish.password as is
			}
		}

		if (questions.length > 0) {
			inquirer.prompt(questions).then(answers => {
				if (answers.username) {
					config.publish.username = answers.username;
				}

				if (answers.password) {
					config.publish.password = answers.password;
				}

				launchPublish();
			});
		} else {
			launchPublish();
		}
	}
};
