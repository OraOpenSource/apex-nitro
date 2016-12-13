const chalk = require('chalk');
var path = require('path');
var fs = require('fs');

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

    // outputs all available projects
    getAvailableProjects: function(userConfig) {
        Object.keys(userConfig).forEach(function(key) {
            console.log("  -", chalk.cyan.bold(key));
        });
    },

    // returns the local path for the user config (windows, mac, linux)
    getLocalUserConfigPath: function() {
        let localPath =
            // use process.env.APPDATA for Windows (default)
            process.env.APPDATA
            // process.env.APPDATA is undefined, then use darwin platform (Mac)
            || (process.platform == 'darwin' ?
                process.env.HOME + '/Library/Preferences'
                // if process.platform is not darwin, then it's Linux
                // use root
                : '/');
        return path.resolve(localPath + '/.afeb/config.json');
    },

    // returns the local path for the user config (windows, mac, linux)
    getLocalUserConfig: function() {
        try {
            var userConfig = require(this.getLocalUserConfigPath());
        } catch (e) {
            var userConfig = {};
        }

        return userConfig;
    },

    // ensures that the directory structure exists for a given file
    makeDirectoryStructure: function(filePath) {
        var dirname = path.dirname(filePath);
        if (fs.existsSync(dirname)) {
            return true;
        }

        this.makeDirectoryStructure(dirname);
        fs.mkdirSync(dirname);
    }
};
