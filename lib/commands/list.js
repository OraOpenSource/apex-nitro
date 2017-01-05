var util = require('../util/util');

// AFEB - list
module.exports = function(args, options) {
    console.log("\nAvailable projects:");
    util.getAvailableProjects();
    process.exit();
}
