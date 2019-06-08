/* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: true}}] */

const path = require('path');
const readline = require('readline');
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

module.exports = function () {
	const config = util.getConfig();

	validations.publish(config);

	// Compile and publish files
	const launchPublish = async function (password) {
		launch(async () => {
			console.log(chalk.cyan('...Now'), chalk.cyan.bold('publishing!'));

			const publish = function () {
				publisher.publish({
					sqlclPath: config.publish.path,
					connectString: `${config.publish.username}/${password}@${
						config.publish.connectionString
					}`,
					directory: path.resolve(config.distFolder),
					appID: getAppID(config.appUrl),
					destination: config.publish.destination,
					pluginName: config.publish.pluginName
				});
			};

			if (config.mode === 'basic') {
				publish();
			} else {
				const build = require(path.resolve(process.cwd(), 'nitro', 'build-phases.js'));

				const lintValid = await build.lint();

				if (lintValid) {
					await build.bundleDev();
					await build.bundleProd();
					publish();
				}
			}
		});
	};

	// Validates if the srcFolder is valid
	if (validations.isSrcFolderValid(config)) {
		// If the password is not provided, let's prompt it to the user
		if (config.publish.connectionType === 'basic' && config.publish.password === undefined) {
			const rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout
			});

			rl.question('Enter your database schema password: ', answer => {
				launchPublish(answer);
				rl.close();
			});
		} else {
			launchPublish(config.publish.password);
		}
	}
};
