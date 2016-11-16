var util = require('../util/util');

// import user config
var userConfig = require('../../config');

// list projects
module.exports = function(args, options) {
    console.log("\nAvailable projects:");
    util.getAvailableProjects(userConfig);
    process.exit();
}
