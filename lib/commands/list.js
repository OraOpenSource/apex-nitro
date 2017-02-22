const chalk = require("chalk");
var configurator = require('json-local-configurator');

// AFEB - list
module.exports = function() {
    console.log("\nAvailable projects:");
    configurator.getProjects("afeb").forEach(function(key) {
        console.log("  -", chalk.cyan.bold(key));
    });
    process.exit();
}
