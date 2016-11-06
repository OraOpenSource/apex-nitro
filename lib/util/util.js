const chalk = require('chalk');

module.exports = {
    // validates if an object is empty (true), otherwise (false)
    isEmptyObject: function(obj) {
        return !Object.keys(obj).length;
    },

    // parses and validates a JSON object
    isValidJSON: function(json) {
        try {
            JSON.parse(json);
            return true;
        } catch (e) {
            console.error(e);
            process.exit();
            return false;
        }
    },

    getAvailableProjects: function(userConfig) {
        Object.keys(userConfig).forEach(function(key) {
            console.log("  -", chalk.cyan.bold(key));
        });
    }
};
