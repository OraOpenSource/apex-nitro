// APEX Gulp Stack

// 1. LIBRARIES
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    del = require('del'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create()
    getLocalIp = require('node-localip'),
    clip = require('gulp-clip-empty-files'),
    util = require('./util.js'),
    path = require('path'),
    argv = require('yargs').argv,
    extend = require('util')._extend;

// 2. PREREQUISITES AND ERROR HANDLING
var defaultConfig = require('./default.json'),
    userConfig = require('./config.json'),
    config = extend(defaultConfig, userConfig[argv.project]);

// command line syntax check
if (typeof argv.project == "undefined") {
    console.log("The correct syntax is: npm start -- --project=yourProjectName");
    process.exit(1);
}

// project exists check
if (typeof userConfig[argv.project] == "undefined") {
    console.log("Project", argv.project ,"doesn't exists in your config.json file.");
    process.exit(1);
}

// missing appURL check
if (util.isEmptyObject(config.appURL)) {
    console.log("Missing appURL in your config.json file.");
}

// missing srcFolder check
if (util.isEmptyObject(config.srcFolder)) {
    console.log("Missing srcFolder in your config.json file.");
}

// missing distFolder check
if (util.isEmptyObject(config.distFolder)) {
    console.log("Missing distFolder in your config.json file.");
}

if((util.isEmptyObject(config.appURL))
|| (util.isEmptyObject(config.srcFolder))
|| (util.isEmptyObject(config.distFolder))) {
    process.exit(1);
}

// 3. SETTINGS VARIABLES
var paths = {
        src: path.normalize(config.srcFolder.replace(/\/+$/, "")),
        dist: path.normalize(config.distFolder.replace(/\/+$/, "")),
        sourcemaps: path.normalize('./')
    },
    assets = {
        js: path.normalize('/js/'),
        css: path.normalize('/css/'),
        scss: path.normalize('/scss/'),
        img: path.normalize('/img/'),
        lib: path.normalize('/lib/')
    },
    files = {
        js: path.normalize('**/*.js'),
        css: path.normalize('**/*.css'),
        scss: path.normalize('**/*.scss'),
        all: path.normalize('**/*.*'),
    },
    sizeOptions = {
        showFiles: true
    },
    renameOptions = {
        suffix: '.min'
    },
    sassOptions = {
        errLogToConsole: true,
        sourcemap: true
    };

// 4. TASKS
// cleans the dist directory
gulp.task('clean-dist', function() {
    return del([paths.dist], { force: true });
});

// javascript
gulp.task('js', function() {
    return gulp.src(paths.src + assets.js + files.js)
        .pipe(plugins.plumber())
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.if(config.javascriptConcat.enabled,
            plugins.concat(config.javascriptConcat.finalName + '.js')))
        .pipe(plugins.size(sizeOptions))
        .pipe(plugins.sourcemaps.write(paths.sourcemaps))
        .pipe(gulp.dest(paths.dist + assets.js))
        .pipe(plugins.uglify()).on('error', function(e) {})
        .pipe(plugins.rename(renameOptions))
        .pipe(plugins.size(sizeOptions))
        .pipe(plugins.sourcemaps.write(paths.sourcemaps))
        .pipe(gulp.dest(paths.dist + assets.js));
});

// javascript & browsersync
gulp.task('js-browsersync', ['js'], function() {
    browserSync.reload();
});

// scss
gulp.task('scss', function() {
    return gulp.src(paths.src + assets.scss + files.scss)
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass(sassOptions))
        .pipe(plugins.if(config.cssConcat.enabled,
            plugins.concat(config.cssConcat.finalName + '.css')))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.size(sizeOptions))
        .pipe(plugins.sourcemaps.write(paths.sourcemaps))
        .pipe(gulp.dest(paths.dist + assets.css))
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename(renameOptions))
        .pipe(plugins.size(sizeOptions))
        .pipe(plugins.sourcemaps.write(paths.sourcemaps))
        .pipe(clip())
        .pipe(gulp.dest(paths.dist + assets.css))
        .pipe(plugins.if(config.browsersync.enabled, browserSync.stream({match: files.css})));
});

// css
gulp.task('css', function() {
    return gulp.src(paths.src + assets.css + files.css)
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.if(config.cssConcat.enabled,
            plugins.concat(config.cssConcat.finalName + '.css')))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.size(sizeOptions))
        .pipe(plugins.sourcemaps.write(paths.sourcemaps))
        .pipe(gulp.dest(paths.dist + assets.css))
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename(renameOptions))
        .pipe(plugins.size(sizeOptions))
        .pipe(plugins.sourcemaps.write(paths.sourcemaps))
        .pipe(clip())
        .pipe(gulp.dest(paths.dist + assets.css))
        .pipe(plugins.if(config.browsersync.enabled, browserSync.stream({match: files.css})));
});

// copy img files as is
gulp.task('img', function() {
    return gulp.src(paths.src + assets.img + files.all)
        .pipe(gulp.dest(paths.dist + assets.img));
});

// copy lib files as is
gulp.task('lib', function() {
    return gulp.src(paths.src + assets.lib + files.all)
        .pipe(gulp.dest(paths.dist + assets.lib));
});

// starts local server
gulp.task('browser-sync', function() {
    getLocalIp( function ( err, host ) {
        // returns localhost or local ip address if needed
        var proxyHost = (config.multipleDevices ? host : 'localhost') + "~" + config.browsersync.port;
        // returns the apex host URL (before f?p=)
        var apexHost = config.appURL.substring(0, config.appURL.indexOf("f?p="));
        // takes the apex query string from the provided apex url
        var apexQueryString = config.appURL.substring(config.appURL.indexOf("f?p=")).split(":");
        // append the itemNames
        apexQueryString[6] = [apexQueryString[6], "G_APP_IMAGES"].filter(function(val){return val;}).join(',');
        // append the itemValues
        apexQueryString[7] = [apexQueryString[7], proxyHost].filter(function(val){return val;}).join(',');
        // rebuild the query string
        apexQueryString = apexQueryString.join(":");

        // launch the browsersync server
        browserSync.init({
            host: host,
            port: config.browsersync.port,
            notify: config.browsersync.notify,
            proxy: {
                target: apexHost + apexQueryString,
                middleware: function (req, res, next) {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    next();
                  }
            },
            serveStatic: [config.distFolder]
        });
    });
});

// watch for changes
gulp.task('watch', function() {
    // browsersync support
    var jsWatch = (config.browsersync.enabled ? ['js-browsersync'] : ['js']);

    gulp.watch(paths.src + assets.js + files.js, jsWatch);

    // sass support
    if (config.sass.enabled) {
        gulp.watch(paths.src + assets.scss + files.scss, ['scss']);
    } else {
        gulp.watch(paths.src + assets.css + files.css, ['css']);
    }

    gulp.watch(paths.src + assets.img + files.all, ['img']);
    gulp.watch(paths.src + assets.lib + files.all, ['lib']);
});

// Default task: builds your app
gulp.task('default', function() {
    // default task order
    var tasks = ['js', 'img', 'lib'];

    // sass support
    if (config.sass.enabled) {
        tasks.unshift('scss');
    } else {
        tasks.unshift('css');
    }

    // browsersync support
    if (config.browsersync.enabled) {
        tasks.unshift('browser-sync');
    }

    // run tasks
    runSequence('clean-dist', tasks, 'watch', function() {
        console.log("Successfully built!");
    });
});
