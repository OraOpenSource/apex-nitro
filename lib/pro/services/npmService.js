const spawn = require('cross-spawn');
const path = require('path');

/**
 * @exports npmService
 * @description Service that includes methods to execute npm commands
 */
module.exports = {
	installDependencies,
	installPackage
};

/**
 * @function installDependencies
 * @description Function to install all dependencies of a project
 * @param {ApexJsApp} app
 */
function installDependencies(executionPath) {
	return new Promise((resolve, reject) => {
		let command;
		let args;

		command = 'npm';
		args = ['install', '--loglevel', 'error'];

		const child = spawn(command, args, { cwd: executionPath, stdio: 'inherit' });
		child.on('close', code => {
			if (code !== 0) {
				reject({
					command: `${command} ${args.join(' ')}`
				});
				return;
			}
			resolve('done');
		});
	});
}

/**
 * @function installPackage
 * @description installs a package from npm
 * @param {string} packageName - name of npm package or git repository url
 * @param {path} executionPath - directory in which the package should be installed
 */
function installPackage(packageName, executionPath) {
	return new Promise((resolve, reject) => {
		let command;
		let args;

		command = 'npm';
		args = ['--prefix', executionPath, 'install', packageName, '--no-save'];

		const child = spawn(command, args, { stdio: 'inherit' });

		child.on('close', code => {
			if (code !== 0) {
				reject({
					command: `${command} ${args.join(' ')}`
				});
				return;
			}
			resolve('done');
		});
	});
}
