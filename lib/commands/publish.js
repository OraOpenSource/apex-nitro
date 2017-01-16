var path = require('path'),
    execSync = require('child_process').execSync,
    util = require('../util/util'),
    validations = require('../util/validations');

// AFEB - publish
module.exports = function(args, options) {
    // project is the first argument
    let project = args[0];

    // validates command line syntax
    validations.cliSyntax(project, "afeb publish <project>");

    // validates if project exists
    validations.projectExists(project);

    // validates if connectString exists
    validations.connectStringRequired(project);

    // merge default config with user config
    let config = util.getProjectConfig(project);

    console.log("Uploading to Shared Components - Application Static Files...");

    // execute the upload process
    var childProcess = execSync(
        config.sqlcl.path + " " + // sqlcl path (default is sql)
        config.sqlcl.connectString + " @" + // connect string (user/pass@server:port/sid)
        path.resolve(__dirname, "../sqlcl/script") + " " + // script to execute
        path.resolve(__dirname, "../sqlcl/distUpload.js") + " " + // param &1 (script to execute)
        path.resolve(config.distFolder) + " " + // param &2 (distFolder)
        util.getAppID(config.appURL) // param &3 (appID)
        , { encoding: 'utf8' }
    );

    console.log(childProcess);

    console.log("Files were uploaded successfully.");
}
