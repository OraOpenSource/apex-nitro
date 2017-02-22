var browsersync = require('browser-sync').create(),
    gulp = require('gulp'),
    portscanner  = require('portscanner'),
    validations = require('../util/validations'),
    configurator = require('json-local-configurator');

const portStart = 4000
    , portEnd = 4999
    , localhost = '127.0.0.1';

// AFEB - launch
module.exports = function(args) {
    // project is the first argument
    let project = args[0];
    // validates command line syntax
    validations.cliProjectSyntax(project, "afeb launch <project>");
    // validate if project exists
    validations.projectExists(project);
    // missing project header.packageJsonPath
    validations.header(project);
    // get project configuration
    let config = configurator.getConfig("afeb", project);

    portscanner.findAPortNotInUse(portStart, portEnd, localhost, function(e, port1) {
        portscanner.findAPortNotInUse(port1 + 1, portEnd, localhost, function(e, port2) {
            portscanner.findAPortNotInUse(port2 + 1, portEnd, localhost, function(e, port3) {
                // gulp tasks
                var taskClean = require('../gulp/clean')(config),
                    taskJS = require('../gulp/js')(config, browsersync),
                    taskCSS = require('../gulp/css')(config, browsersync),
                    taskOther = require('../gulp/other')(config, browsersync),
                    taskThemeRoller = require('../gulp/themeroller')(config),
                    taskBroswerSync = require('../gulp/browsersync')(config, browsersync, port1, port2, port3);
                    taskWatch = require('../gulp/watch')(config);
                    taskLaunch = require('../gulp/launch')(config);

                // start gulp process
                gulp.start('launch');
            });
        });
    });
}
