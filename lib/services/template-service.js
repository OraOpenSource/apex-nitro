const path = require('path');

const initTemplate = async (initFilePath, appDetails) => {
	const init = require(path.resolve(initFilePath));
	const initResult = await init(appDetails);
	return initResult;
};

const getTemplateNameFromGitUrl = gitUrl => {
	return gitUrl.split('/').pop().split('.')[0];
};

const getNpmInstallUrlFromGitUrl = gitUrl => {
	const protocol = gitUrl.match(/[htps|]+/i)[0];
	return `git+${protocol}://git@${gitUrl.replace(protocol + '://', '')}`;
};

module.exports = {
	initTemplate,
	getTemplateNameFromGitUrl,
	getNpmInstallUrlFromGitUrl
};
