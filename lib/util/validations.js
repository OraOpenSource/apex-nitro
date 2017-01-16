const chalk = require('chalk');
var util = require('./util');
var userConfig = util.getLocalUserConfig();

module.exports = {
    // validates a JSON object
    validJSON: function(json) {
        if (!util.isValidJSON(json)) {
            console.error(chalk.red.bold("Your project configuration is not a valid JSON object."));
            console.error(json);
            console.error(chalk.red.bold("Try using a JSON Linter such as: http://jsonlint.com/"));
            process.exit();
        }
    },

    // validates command line syntax and show the available projects
    cliSyntax: function(project, syntax) {
        if (typeof project == "undefined") {
            console.error(chalk.red.bold(`\nThe correct syntax is:`), chalk.green.bold(`${syntax}`));
            console.error("\nAvailable projects:");
            util.getAvailableProjects();
            process.exit();
        }
    },

    // validates if a project exists
    projectExists: function(project) {
        if (typeof userConfig[project] == "undefined") {
            console.error(chalk.red.bold("Project", project, "doesn't exist in your configuration."));
            console.error("Type", chalk.cyan.bold("afeb config <project>"), "to create it, or choose from one of your existing projects:");
            util.getAvailableProjects();
            process.exit();
        }
    },

    // validates if Sass or Less is used
    preprocessor: function(project) {
        if (userConfig[project].sass.enabled && userConfig[project].less.enabled) {
            console.error(chalk.red.bold("Choose either Sass or Less (not both) as the CSS preprocessor for project", project));
            process.exit();
        }
    },

    // validates missing project header package.json path
    header: function (project) {
        if (userConfig[project].header.enabled) {
            try {
                var pkg = require(userConfig[project].header.packageJsonPath);
            } catch (e) {
                console.error(chalk.red.bold("Your 'Header package.json path' is invalid. It should point to your project package.json file."));
                process.exit();
            }
        }
    },

    // validates missing project header package.json path
    connectStringRequired: function (project) {
        if (userConfig[project].connectString || "" == "") {
                console.error(chalk.red.bold("This project is missing the 'Connection String' parameter in order to publish the files."));
                console.error("Type", chalk.cyan.bold("afeb config " + project), "to edit it.");
                process.exit();
        }
    }
};
