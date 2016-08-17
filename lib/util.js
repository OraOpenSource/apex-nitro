module.exports = {
    // validates if an object is empty (true), otherwise (false)
    isEmptyObject: function(obj) {
        return !Object.keys(obj).length;
    },

    // parses the user config.json and validates json
    isValidJSON: function(obj) {
        try {
            JSON.parse(obj);
            return true;
        } catch (e) {
            return false;
        }
    },

    // verifies if APEX Front-End Boost is up to date with the latest version
    isUpToDate: function() {
        const chalk = require('chalk');
        const updateNotifier = require('update-notifier');
        const pkg = require('../package.json');

        // Checks for available update and returns an instance
        const notifier = updateNotifier({pkg});

        // Notify using the built-in convenience method
        if (notifier.update) {
            notifier.notify({
                defer: false,
                message: chalk.bold('APEX Front-End Boost') + ' update available ' + chalk.dim(notifier.update.current) + chalk.reset(' → ') +
        		chalk.green(notifier.update.latest) + ' \nRun:\n' + chalk.cyan.bold('git fetch origin') + '\n' + chalk.cyan.bold('git reset--hard origin/master') + '\n' + chalk.cyan.bold('npm install')
            });
        }
    }
};
