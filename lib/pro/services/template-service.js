const path = require('path');
const fs = require('fs-extra');
const logger = require('./log-service');
const npmService = require('./npm-service');

const installTemplate = (templateName, installPath) => {
	logger.logInfo(`installing template "${templateName}"`);
	fs.ensureDirSync(installPath);
	return npmService
		.installPackage(templateName, installPath)
		.then(() => logger.logSuccess('done\n'));
};

const installDependencies = appPath => {
	logger.logInfo('installing dependencies');
	return npmService.installDependencies(appPath).then(() => logger.logSuccess('done\n'));
};

const copyFilesSync = (fromPath, toPath) => {
	try {
		logger.logInfo('copying template files');
		fs.copySync(fromPath, toPath);
		logger.logSuccess('done\n');
	} catch (error) {
		logger.logError('Error while copying the template files: ', error);
		throw new Error('Error while copying the template files: ', error);
	}
};

const initTemplate = async appDetails => {
	logger.logInfo('initializing template');
	const init = require(path.resolve('./bin/init.js'));
	const proConfig = await init(appDetails);
	logger.logSuccess('done\n');
	return proConfig;
};

const remove = async filePath => {
	logger.logInfo('cleaning up installation');
	await fs.remove(filePath);
	logger.logSuccess('done\n');
};

/**
 * @exports templateCreationService
 * @description File that includes all the necessary steps during the creation of a new app
 */
module.exports = {
	installTemplate,
	installDependencies,
	copyFilesSync,
	initTemplate,
	remove
};
