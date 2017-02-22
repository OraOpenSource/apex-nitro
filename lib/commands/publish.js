var validations = require('../util/validations'),
    configurator = require('json-local-configurator'),
    publisher = require('apex-publish-static-files');

// validates if an object is empty (true), otherwise (false)
var getAppID = function(appURL) {
    let paramString = appURL.substring(appURL.indexOf("f?p=") + 4).split(":");
    return paramString[0];
};

// AFEB - publish
module.exports = function(args) {
    // project is the first argument
    let project = args[0];
    // checks command line syntax
    validations.cliProjectSyntax(project, "afeb publish <project>");
    // checks if project exists
    validations.projectExists(project);
    // get project configuration
    let config = configurator.getConfig("afeb", project);

    publisher.publish({
        sqlclPath: config.sqlcl.path,
        connectString: config.sqlcl.connectString,
        directory: config.distFolder,
        appID: getAppID(config.appURL)
    });
}
