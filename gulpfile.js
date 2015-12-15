// APEX Gulp Stack
// - - - - - - - - - - - - - - -
// This file processes all of the assets in the "src" folder
// and outputs the finished files in the "dist" folder.

// 1. LIBRARIES
// - - - - - - - - - - - - - - -
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    del = require('del'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create(),
    config = require('./config.json'),
    getLocalIp = require('node-localip'),
    clip = require('gulp-clip-empty-files');

// 2. SETTINGS VARIABLES
// - - - - - - - - - - - - - - -
var paths = {
        src: 'src/',
        dist: 'dist/',
        sourcemaps: './'
    },
    assets = {
        js: 'js/',
        css: 'css/',
        scss: 'scss/',
        img: 'img/',
        lib: 'lib/'
    },
    files = {
        js: '**/*.js',
        css: '**/*.css',
        scss: '**/*.scss',
        map: '**/*.map',
        all: '**/*.*',
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

// 3. TASKS
// - - - - - - - - - - - - - - -
// Cleans the dist directory
gulp.task('clean-dist', function() {
    return del([paths.dist]);
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
        // takes the apex query string from the provided apex url
        var apexQueryString = config.browsersync.apexURL.substring(config.browsersync.apexURL.indexOf("f?p="));

        // calculates the number of colons (:) in apexURL
        var colonsInURL = (apexQueryString.match(/:/g) || []).length;

        // 6 is the number of colons to get to the itemNames in
        // (f?p=App:Page:Session:Request:Debug:ClearCache:itemNames:itemValues:PrinterFriendly)
        var colonsToAdd = 6 - colonsInURL;

        // returns localhost or local ip address if needed
        var proxyHost = (config.browsersync.multipleDevices ? host : 'localhost');

        // launch the browsersync server
        browserSync.init({
            host: host,
            port: config.browsersync.port,
            notify: config.browsersync.notify,
            proxy: {
                target: config.browsersync.apexURL + ":".repeat(colonsToAdd) + "G_BROWSERSYNC_HOST:" + proxyHost,
                middleware: function (req, res, next) {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    next();
                  }
            },
            serveStatic: ['.']
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
