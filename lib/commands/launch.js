var browsersync = require('browser-sync').create(),
    gulp = require('gulp'),
    path = require('path'),
    portscanner  = require('portscanner'),
    util = require('../util/util'),
    validations = require('../util/validations');

const portStart = 4000
    , portEnd = 4999
    , localhost = '127.0.0.1';

// project configuration
var config;

// AFEB - launch
module.exports = function(args, options) {
    // project is the first argument
    let project = args[0];
    // validates command line syntax
    validations.cliSyntax(project, "afeb launch <project>");
    // validate if project exists
    validations.projectExists(project);
    // sass or less, not both
    validations.preprocessor(project);
    // missing project header.packageJsonPath
    validations.header(project);
    // merge default config with user config
    config = util.getProjectConfig(project);
    // setting the path, assets and files
    extendConfig();

    portscanner.findAPortNotInUse(portStart, portEnd, localhost, function(e, port1) {
        portscanner.findAPortNotInUse(port1 + 1, portEnd, localhost, function(e, port2) {
            portscanner.findAPortNotInUse(port2 + 1, portEnd, localhost, function(e, port3) {
                // gulp tasks
                var taskClean = require('../gulp/clean')(config),
                    taskJS = require('../gulp/js')(config, browsersync),
                    taskCSS = require('../gulp/css')(config, browsersync),
                    taskImg = require('../gulp/img')(config, browsersync),
                    taskLib = require('../gulp/lib')(config, browsersync),
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

function extendConfig() {
    config.paths = {
        src: path.normalize(config.srcFolder.replace(/\/+$/, "")),
        dist: path.normalize(config.distFolder.replace(/\/+$/, "")),
        sourcemaps: path.normalize('./')
    };

    config.assets = {
        js: path.normalize('/js/'),
        css: path.normalize('/css/'),
        scss: path.normalize('/scss/'),
        sass: path.normalize('/sass/'),
        less: path.normalize('/less/'),
        img: path.normalize('/img/'),
        lib: path.normalize('/lib/')
    };

    config.files = {
        js: path.normalize('*.js'),
        css: path.normalize('*.css'),
        scss: path.normalize('*.scss'),
        sass: path.normalize('*.sass'),
        less: path.normalize('*.less'),
        all: path.normalize('*.*')
    };
}
