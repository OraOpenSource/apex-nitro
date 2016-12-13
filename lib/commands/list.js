var util = require('../util/util');

// import user config
var userConfig = util.getLocalUserConfig();

// list projects
module.exports = function(args, options) {
    console.log("\nAvailable projects:");
    util.getAvailableProjects(userConfig);
    process.exit();
}
