const logger = require("./logService");
const fs = require("fs-extra");
const npmService = require("./npmService");
const path = require("path");

const installTemplate = (templateName, installPath) => {
	logger.logInfo(`installing template "${templateName}"`);
	fs.ensureDirSync(installPath);
	return npmService
		.installPackage(templateName, installPath)
		.then(() => logger.logSuccess("done\n"));
};

const installDependencies = appPath => {
	logger.logInfo("installing dependencies");
	return npmService.installDependencies(appPath).then(() => logger.logSuccess("done\n"));
};

const copyFilesSync = (fromPath, toPath) => {
	try {
		logger.logInfo("copying template files");
		fs.copySync(fromPath, toPath);
		logger.logSuccess("done\n");
	} catch (e) {
		logger.logError("Error while copying the template files: ", e);
		process.exit(1);
	}
};

const initTemplate = async appDetails => {
	logger.logInfo("initializing template");
	const init = require(path.resolve("./bin/init.js"));
	const proConfig = await init(appDetails);
	logger.logSuccess("done\n");
	return proConfig;
};

const remove = filePath => {
	return fs.remove(filePath).then(() => {
		console.log("done");
	});
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
