const path = require('path');
const fs = require('fs-extra');
const logger = require('./log-service');
const npmService = require('./npm-service');

const installTemplate = async (templateName, installPath) => {
	fs.ensureDirSync(installPath);
	await npmService.installPackage(templateName, installPath);
};

const installDependencies = async appPath => {
	await npmService.installDependencies(appPath);
};

const copyFilesSync = (fromPath, toPath) => {
	try {
		fs.copySync(fromPath, toPath);
	} catch (error) {
		logger.logError('Error while copying the template files: ', error);
		throw new Error('Error while copying the template files: ', error);
	}
};

const initTemplate = async (initFilePath, appDetails) => {
	const init = require(path.resolve(initFilePath));
	const initResult = await init(appDetails);
	return initResult;
};

const remove = async filePath => {
	await fs.remove(filePath);
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

const installCssPreprocessors = async cssExtensions => {
	if (cssExtensions.includes('.less')) {
		await npmService.installPackage('less');
	}

	if (cssExtensions.includes('.styl')) {
		await npmService.installPackage('stylus');
	}

	if (cssExtensions.includes('.sass') || cssExtensions.includes('.scss')) {
		await npmService.installPackage('node-sass');
	}
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
	installCssPreprocessors
};
