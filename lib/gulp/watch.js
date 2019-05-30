const notifier = require('node-notifier');
const options = require('./options');

module.exports = function (config, browsersync) {
	// TODO chokidar
	notifier.notify(options.notifySuccessJS());
	browsersync.reload();
};
