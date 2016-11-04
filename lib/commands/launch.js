var browsersync = require('browser-sync').create(),
    gulp = require('gulp'),
    mkdirp = require('mkdirp'),
    extend = require('node.extend'),
    path = require('path'),
    validations = require('../util/validations');

// import default config and user config
var defaultConfig = require('../templates/default'),
    userConfig = require('../../config');

// user project configuration
var config;

// launch AFEB
module.exports = function(args, options) {
    let project = args[0];

    // validate basic stuff (cli syntax, project exists, etc)
    validateBasic(project, userConfig);

    // merge default config with user config
    config = extend(true, {}, defaultConfig, userConfig[project]);

    // validate config data (preprocessor, header)
    validateConfig(project);

    // setting the path, assets and files
    extendConfig();

    // build directory structure
    buildDirectoryStructure();

    // 4. TASKS
    var taskClean = require('../gulp/clean')(gulp, config),
        taskJS = require('../gulp/js')(gulp, config, browsersync),
        taskCSS = require('../gulp/css')(gulp, config, browsersync),
        taskImg = require('../gulp/img')(gulp, config, browsersync),
        taskLib = require('../gulp/lib')(gulp, config, browsersync),
        taskThemeRoller = require('../gulp/themeroller')(gulp, config),
        taskBroswerSync = require('../gulp/browsersync')(gulp, config, browsersync);
        taskWatch = require('../gulp/watch')(gulp, config);
        taskLaunch = require('../gulp/launch')(gulp, config);

    gulp.start('launch');
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

function validateBasic(project, userConfig) {
    // validates command line syntax
    validations.cliSyntax(project, "afeb launch <project>");
    // validate if project exists
    validations.projectExists(project, userConfig[project]);
    // user config json schema validation
    validations.validateConfigSchema(project, userConfig[project]);
}

function validateConfig(project) {
    // sass or less, not both
    validations.preprocessor(project, config);
    // missing project header.packageJsonPath
    validations.header(config);
}

function buildDirectoryStructure() {
    let dirs = [
        config.paths.src + config.assets.js,
        config.paths.src + config.assets.img,
        config.paths.src + config.assets.lib
    ];

    // sass less and css are based on user config
    if (config.sass.enabled || config.less.enabled) {
        if (config.sass.enabled) {
            dirs.push(config.paths.src + config.assets.scss);
        } else {
            dirs.push(config.paths.src + config.assets.less);
        }
    } else {
        dirs.push(config.paths.src + config.assets.css);
    }

    // create directory structure if doesn't exist yet
    for (let i = 0; i < dirs.length; i++) {
        mkdirp.sync(dirs[i]);
    }
}
