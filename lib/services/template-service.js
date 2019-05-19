const path = require('path');
const fs = require('fs-extra');
const logger = require('./log-service');
const npmService = require('./npm-service');
const inquirer = require('inquirer');

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

const initTemplate = async (initFilePath, appDetails) => {
	logger.logInfo('initializing template');
	const init = require(path.resolve(initFilePath));
	const proConfig = await init(appDetails);
	logger.logSuccess('done\n');
	return proConfig;
};

const remove = async filePath => {
	logger.logInfo('cleaning up installation');
	await fs.remove(filePath);
	logger.logSuccess('done\n');
};

const getTemplateNameFromGitUrl = gitUrl => {
	return gitUrl
		.split('/')
		.pop()
		.split('.')[0];
};

const getNpmInstallUrlFromGitUrl = gitUrl => {
	const protocol = gitUrl.match(/[https|ssh]+/i)[0];
	return `git+${protocol}://git@${gitUrl.replace(protocol + '://', '')}`;
};

const initBrowserSync = async browserSyncQuestions => {
	// get browsersync config
	let browserSyncConfig = await inquirer.prompt(browserSyncQuestions);

	// Set browsersync defaults
	if (browserSyncConfig.browsersync.defaults === 'default') {
		browserSyncConfig.browsersync.realTime = true;
		browserSyncConfig.browsersync.ghostMode = false;
		browserSyncConfig.browsersync.notify = true;
		browserSyncConfig.apex = {};
		browserSyncConfig.apex.openBuilder = false;
		delete browserSyncConfig.browsersync.defaults;
	}

	logger.logSuccess('done\n');

	return browserSyncConfig;
};

const initPublish = async publishQuestions => {
	// get publish config
	let publishConfig = await inquirer.prompt(publishQuestions);

	// Set publish defaults
	if (publishConfig.publish.defaults === 'default') {
		publishConfig.publish.destination = 'application';
		publishConfig.publish.path = 'sqlcl';
		publishConfig.publish.username = '';
		publishConfig.publish.password = '';
		publishConfig.publish.connectionString = '';
		delete publishConfig.publish.defaults;
	} else if (publishConfig.publish.password !== '') {
		publishConfig.publish.password = '***************';
	}

	logger.logSuccess('done\n');

	return publishConfig;
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
	remove,
	getTemplateNameFromGitUrl,
	getNpmInstallUrlFromGitUrl,
	initBrowserSync,
	initPublish
};
