const fs = require('fs-extra');
const {spawn} = require('child_process');
const chalk = require('chalk');
const ora = require('ora');

const installPackage = async (packageName, packagePath = './') => {
	const spinner = ora(`Installing ${packageName}`).start();

	await fs.ensureDir(packagePath);

	return new Promise((resolve, reject) => {
		const command = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';
		let args;

		if (packagePath) {
			args = ['--prefix', packagePath, 'install', packageName];
		} else {
			args = ['install', packageName];
		}

		const child = spawn(command, args, {stdio: 'ignore'});

		child.on('close', code => {
			if (code !== 0) {
				spinner.fail();
				reject(new Error(`Unable to install ${packageName} in ${packagePath}`));
			}

			spinner.succeed();
			resolve('done');
		});
	});
};

const installDependencies = async (config, packagePath = './') => {
	await fs.ensureDir(packagePath);

	const spinner = ora(`Installing dependencies`).start();

	if (config.cssExtensions && config.cssExtensions.length > 1) {
		if (config.cssExtensions.includes('.less')) {
			await installPackage('less');
		}

		if (config.cssExtensions.includes('.styl')) {
			await installPackage('stylus');
		}

		if (
			config.cssExtensions.includes('.sass') ||
			config.cssExtensions.includes('.scss')
		) {
			// Await installPackage("node-sass");
			await installPackage('sass');
			await installPackage('sass-loader');
		}
	}

	return new Promise((resolve, reject) => {
		const command = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';
		const args = ['install', '--loglevel', 'error'];

		const child = spawn(command, args, {cwd: packagePath, stdio: 'ignore'});

		child.on('close', code => {
			if (code !== 0) {
				spinner.fail();
				reject(new Error(`Unable to install dependencies in ${packagePath}`));
			}

			spinner.succeed();
			resolve('done');
		});
	});
};

module.exports = {
	installPackage,
	installDependencies
};
