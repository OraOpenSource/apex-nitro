const chalk = require('chalk');
var configurator = require('json-local-configurator');

module.exports = {
    // validates command line syntax and show the available projects
    cliProjectSyntax: function(project, syntax) {
        if (typeof project == "undefined") {
            console.error(chalk.red.bold(`\nThe correct syntax is:`), chalk.green.bold(`${syntax}`));
            console.error("\nAvailable projects:");
            configurator.getProjects("afeb").forEach(function(key) {
                console.error("  -", chalk.cyan.bold(key));
            });
            process.exit();
        }
    },

    // validates if a project exists
    projectExists: function(project) {
        if (typeof configurator.getConfig("afeb")[project] == "undefined") {
            console.error(chalk.red.bold("Project", project, "doesn't exist in your configuration."));
            console.error("Type", chalk.cyan.bold("afeb config <project>"), "to create it, or choose from one of your existing projects:");
            configurator.getProjects("afeb").forEach(function(key) {
                console.error("  -", chalk.cyan.bold(key));
            });
            process.exit();
        }
    },

    // validates missing project header package.json path
    header: function (project) {
        if (configurator.getConfig("afeb")[project].header.enabled) {
            try {
                var pkg = require(configurator.getConfig("afeb")[project].header.packageJsonPath);
            } catch (e) {
                console.error(chalk.red.bold("Your 'Header package.json path' is invalid. It should point to your project package.json file."));
                process.exit();
            }
        }
    }
};
