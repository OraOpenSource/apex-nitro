const chalk = require('chalk');

var path = require('path'),
    fs = require('fs'),
    extend = require('node.extend');

var defaultConfig = require('../templates/default');

module.exports = {
    // validates if an object is empty (true), otherwise (false)
    isEmptyObject: function(obj) {
        return !Object.keys(obj).length;
    },

    // validates if an object is empty (true), otherwise (false)
    getAppID: function(appURL) {
        let paramString = appURL.substring(appURL.indexOf("f?p=") + 4).split(":");
        return paramString[0];
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
    getAvailableProjects: function() {
        Object.keys(this.getLocalUserConfig()).forEach(function(key) {
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
                // if process.platform is not darwin, then it's Linux, use root
                : process.env.HOME);
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

    // returns the local path for the user config (windows, mac, linux)
    getProjectConfig: function(project) {
        let config = extend(true, {}, defaultConfig, this.getLocalUserConfig()[project]);

        return config;
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
