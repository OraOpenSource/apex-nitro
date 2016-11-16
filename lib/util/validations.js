const chalk = require('chalk');
var util = require('./util');

module.exports = {
    // validates command line syntax and show the available projects
    cliSyntax: function(project, syntax, userConfig) {
        if (typeof project == "undefined") {
            console.error(chalk.red.bold(`\nThe correct syntax is:`), chalk.green.bold(`${syntax}`));
            console.error("\nAvailable projects:");
            util.getAvailableProjects(userConfig);
            process.exit();
        }
    },

    // validates a JSON object
    validJSON: function(json) {
        if (!util.isValidJSON(json)) {
            console.error(chalk.red.bold("Your project configuration is not a valid JSON object."));
            console.error(json);
            console.error(chalk.red.bold("Try using a JSON Linter such as: http://jsonlint.com/"));
            process.exit();
        }
    },

    // validates if a project exists
    projectExists: function(project, config) {
        if (typeof config == "undefined") {
            console.log(chalk.red.bold("Project", project, "doesn't exist in your configuration."));
            process.exit();
        }
    },

    // parses the user config.json and validates json
    validateConfigSchema: function(project, config) {
        var schema = require('../templates/defaultSchema'),
            validate = require('jsonschema').validate;

        // config json schema validation
        var userConfigSchema = validate(config, schema);
        if (userConfigSchema.errors.length > 0) {
            console.log(chalk.red.bold("Your configuration is not valid. See errors below:"));
            console.log(config);
            console.log(userConfigSchema.errors.map(function(elem){
                return (elem.property + " " + elem.message).replace("instance", project);
            }).join("\n"));
            process.exit();
        }
    },

    // validates if Sass or Less is used
    preprocessor: function(project, config) {
        if (config.sass.enabled && config.less.enabled) {
            console.log(chalk.red.bold("Choose either Sass or Less (not both) as the CSS preprocessor for project", project));
            process.exit();
        }
    },

    // validates missing project header package.json path
    header: function (config) {
        if (config.header.enabled) {
            try {
                var pkg = require(config.header.packageJsonPath);
            } catch (e) {
                console.log(chalk.red.bold("Your 'Header package.json path' is invalid. It should point to your project package.json file."));
                process.exit();
            }
        }
    }
};
