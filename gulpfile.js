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
    http = require('http'),
    https = require('https'),
    getLocalIp = require('node-localip');

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
    sourcemapsOptions = {
        loadMaps: true
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

// Compiles the JavaScript (error handling via plumber)
gulp.task('js', function() {
    return gulp.src(paths.src + assets.js + files.js)
        .pipe(plugins.plumber())
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('app.js'))
        .pipe(plugins.size(sizeOptions))
        .pipe(plugins.sourcemaps.write(paths.sourcemaps))
        .pipe(gulp.dest(paths.dist + assets.js))
        .pipe(plugins.uglify()).on('error', function(e) {})
        .pipe(plugins.rename(renameOptions))
        .pipe(plugins.size(sizeOptions))
        .pipe(gulp.dest(paths.dist + assets.js));
});

// Compiles the JavaScript with Browsersync
gulp.task('js-browsersync', ['js'], function() {
    browserSync.reload();
});

// Compiles scss, adds autoprefixer and sourcemaps
gulp.task('scss', function() {
    return gulp.src(paths.src + assets.scss + files.scss)
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init(sourcemapsOptions))
        .pipe(plugins.sass(sassOptions))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.size(sizeOptions))
        .pipe(plugins.sourcemaps.write(paths.sourcemaps))
        .pipe(gulp.dest(paths.src + assets.css));
});

// Minifies css, injects the browser's css if Browsersync is enabled
gulp.task('css', function() {
    // copy un-minified css and map file to dist folder
    gulp.src(paths.src + assets.css + files.all)
        .pipe(gulp.dest(paths.dist + assets.css));

    // minify css
    return gulp.src(paths.src + assets.css + files.css)
        .pipe(plugins.plumber())
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename(renameOptions))
        .pipe(plugins.size(sizeOptions))
        .pipe(gulp.dest(paths.dist + assets.css))
        .pipe(plugins.if(config.enableBrowsersync, browserSync.stream({match: files.css})));
});

// Sequentially run tasks 'scss' and 'css'
gulp.task('scss-css', function() {
    runSequence('scss', 'css', function() {});
});

// Copies img files as is
gulp.task('img', function() {
    return gulp.src(paths.src + assets.img + files.all)
        .pipe(gulp.dest(paths.dist + assets.img));
});

// Copies lib files as is
gulp.task('lib', function() {
    return gulp.src(paths.src + assets.lib + files.all)
        .pipe(gulp.dest(paths.dist + assets.lib));
});

// Static server
gulp.task('browser-sync', function() {
    getLocalIp( function ( err, host ) {
        // build the proxy
        var proxy = (config.browsersync.apex.https ? "https://" : "http://") +
                    config.browsersync.apex.host +
                    config.browsersync.apex.path + "f?p=" +
                    config.browsersync.apex.appID;

        // launch browsersync
        browserSync.init({
            host: host,
            port: config.browsersync.port,
            notify: config.browsersync.notify,
            proxy: {
                target: proxy,
                middleware: function (req, res, next) {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    next();
                  }
            },
            serveStatic: ['.']
        });

        if (config.browsersync.rest.enabled) {
            // build the proxy
            var browsersyncHost = (config.browsersync.apex.https ? "https://" : "http://") + host + ':' + config.browsersync.port + "/";

            // POST Body
            var postBody = JSON.stringify({});

            // POST Headers
            var postHeaders = {
                'Content-Type' : 'application/json',
                'Content-Length' : Buffer.byteLength(postBody, 'utf8'),
                'Browsersync-Host' : browsersyncHost
            };

            // POST Options
            var postOptions = {
                host : config.browsersync.apex.host,
                port : config.browsersync.rest.port,
                path : config.browsersync.apex.path +
                        config.browsersync.rest.schema +
                        '/browsersync/host',
                method : 'POST',
                headers : postHeaders
            };

            // do the POST call
            var restPOST;

            if (config.browsersync.apex.https) {
                restPOST = https.request(postOptions, function(res) {
                    res.on('data', function(d) {
                        console.log('POST result:');
                        console.log(d);
                    });
                });
            } else {
                restPOST = http.request(postOptions, function(res) {
                    res.on('data', function(d) {
                        console.log('POST result:');
                        console.log(d);
                    });
                });
            }

            // write the POST body
            restPOST.write(postBody);
            restPOST.end();
            restPOST.on('error', function(e) {
                console.error(e);
            });
        }
    });
});

// Watch for changes and recompiles
gulp.task('watch', function() {
    // browsersync support
    var jsWatch = (config.enableBrowsersync ? ['js-browsersync'] : ['js']);

    gulp.watch(paths.src + assets.js + files.js, jsWatch);

    // sass support
    if (config.enableSass) {
        gulp.watch(paths.src + assets.scss + files.scss, ['scss-css']);
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
    if (config.enableSass) {
        tasks.unshift('scss-css');
    } else {
        tasks.unshift('css');
    }

    // browsersync support
    if (config.enableBrowsersync) {
        tasks.unshift('browser-sync');
    }

    // run tasks
    runSequence('clean-dist', 'watch', tasks, function() {
        console.log("Successfully built!");
    });
});
