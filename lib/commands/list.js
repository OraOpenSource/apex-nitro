var util = require('../util/util');

// import user config
try {
    var userConfig = require('../../config');
} catch (e) {
    var userConfig = {};
}

// list projects
module.exports = function(args, options) {
    console.log("\nAvailable projects:");
    util.getAvailableProjects(userConfig);
    process.exit();
}
