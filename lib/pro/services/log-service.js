const logSymbols = require('log-symbols');
const chalk = require('chalk');

/**
 * @exports logger
 * @description logging methods for the app creation
 */
module.exports = {
	logSuccess,
	logError,
	logWarning,
	logInfo,
	log
};

function log(msg) {
	console.log(msg);
}

function logSuccess(msg) {
	console.log(logSymbols.success, msg);
}

function logInfo(msg) {
	console.log(logSymbols.info, msg);
}

function logWarning(msg) {
	console.log(logSymbols.warning, msg);
}

function logError(msg, err) {
	console.log(logSymbols.error, chalk.red(msg));
	if (err) {
		console.log(chalk.red(`${err.stack}`));
	}
}
