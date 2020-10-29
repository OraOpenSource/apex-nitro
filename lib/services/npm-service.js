const fs = require('fs-extra');
const {spawn} = require('child_process');
const ora = require('ora');

const installPackage = async (packageName, packagePath = './') => {
	const spinner = ora(`Installing ${packageName}`).start();

	await fs.ensureDir(packagePath);

	return new Promise((resolve, reject) => {
		const command = process.platform.startsWith('win') ? 'npm.cmd' : 'npm';

		const args = packagePath ? ['--prefix', packagePath, 'install', packageName] : ['install', packageName];

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

	const spinner = ora('Installing dependencies').start();

	if (config.cssExtensions.includes('scss')) {
		await installPackage('sass');
		await installPackage('sass-loader');
	}

	if (config.cssExtensions.includes('less')) {
		await installPackage('less');
		await installPackage('less-loader');
	}

	if (config.cssExtensions.includes('styl')) {
		await installPackage('stylus');
		await installPackage('stylus-loader');
	}

	return new Promise((resolve, reject) => {
		const command = process.platform.startsWith('win') ? 'npm.cmd' : 'npm';
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
