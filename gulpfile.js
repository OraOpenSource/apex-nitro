// APEX Gulp Stack

// 1. LIBRARIES
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    del = require('del'),
    runSequence = require('run-sequence'),
    browsersync = require('browser-sync').create(),
    clip = require('gulp-clip-empty-files'),
    util = require('./util.js'),
    path = require('path'),
    argv = require('yargs').argv,
    merge = require('merge-stream'),
    extend = require('node.extend');

// 2. PREREQUISITES AND ERROR HANDLING
var defaultConfig = require('./default.json'),
    userConfig = require('./config.json'),
    config = extend(true, {}, defaultConfig, userConfig[argv.project]);

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
        sourcemap: true,
        includePaths: [path.normalize(config.sass.includePath)]
    },
    apexMiddleware = function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Set-Cookie', ['oos-apex-frontend-boost-app-images=//' + req.headers.host + '/']);
        next();
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
    browsersync.reload();
});

// scss
gulp.task('style', function() {
    var sourceFiles;

    if (config.sass.enabled) {
        sourceFiles = paths.src + assets.scss + files.scss;
    } else {
        sourceFiles = paths.src + assets.css + files.css;
    }

    var sourceStream = gulp.src(sourceFiles)
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.if(config.sass.enabled, plugins.sass(sassOptions)))
        .pipe(plugins.if(config.cssConcat.enabled, plugins.concat(config.cssConcat.finalName + '.css')));

    var unmin = sourceStream
        .pipe(plugins.clone())
        .pipe(plugins.autoprefixer())
        .pipe(plugins.size(sizeOptions))
        .pipe(plugins.sourcemaps.write(paths.sourcemaps));

    var min = sourceStream
        .pipe(plugins.clone())
        .pipe(plugins.autoprefixer())
        .pipe(plugins.cssnano())
        .pipe(plugins.rename(renameOptions))
        .pipe(plugins.size(sizeOptions))
        .pipe(plugins.sourcemaps.write(paths.sourcemaps));

    return merge(unmin, min)
        .pipe(clip())
        .pipe(gulp.dest(paths.dist + assets.css))
        .pipe(plugins.if(config.browsersync.enabled, browsersync.stream({match: files.css})));
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
gulp.task('browsersync', function() {
    // // returns the apex host URL (before f?p=)
    var apexHost = config.appURL.substring(0, config.appURL.indexOf("f?p="));
    // // takes the apex query string from the provided apex url
    var apexQueryString = config.appURL.substring(config.appURL.indexOf("f?p="))

    // launch the browsersync server
    browsersync.init({
        port: config.browsersync.port,
        notify: config.browsersync.notify,
        proxy: {
            target: apexHost + apexQueryString,
            middleware: apexMiddleware
        },
        serveStatic: [config.distFolder]
    });
});

// watch for changes
gulp.task('watch', function() {
    // browsersync support
    var jsWatch = (config.browsersync.enabled ? ['js-browsersync'] : ['js']);

    gulp.watch(paths.src + assets.js + files.js, jsWatch);

    gulp.watch([
        paths.src + assets.scss + files.scss,
        paths.src + assets.css + files.css
    ], ['style']);

    gulp.watch(paths.src + assets.img + files.all, ['img']);
    gulp.watch(paths.src + assets.lib + files.all, ['lib']);
});

// Default task: builds your app
gulp.task('default', function() {
    // default task order
    var tasks = ['js', 'style', 'img', 'lib'];

    // browsersync support
    if (config.browsersync.enabled) {
        tasks.unshift('browsersync');
    }

    // run tasks
    runSequence('clean-dist', tasks, 'watch', function() {
        console.log("APEX Front-End Boost has successfully processed your files.");
    });
});
