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
    config = require('./config.json');

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
    };;

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

// Optimizes img files
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
    browserSync.init({
        port: config.browsersync.port,
        notify: config.browsersync.notify,
        proxy: {
            target: config.browsersync.proxyTarget,
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
              }
        },
        serveStatic: ['.']
    });
});

// Watch for changes and recompiles
gulp.task('watch', function() {
    // browsersync support
    var jsWatch = (config.enableBrowsersync ? ['js-browsersync'] : ['js']);

    // sass support
    if (config.enableSass) {
        gulp.watch(paths.src + assets.scss + files.scss, ['scss']);
    }

    gulp.watch(paths.src + assets.css + files.css, ['css']);
    gulp.watch(paths.src + assets.js + files.js, jsWatch);
    gulp.watch(paths.src + assets.img + files.all, ['img']);
    gulp.watch(paths.src + assets.lib + files.all, ['lib']);
});

// Default task: builds your app
gulp.task('default', function() {
    // default task order
    var tasks = ['js', 'img', 'lib'];

    // sass support
    if (config.enableSass) {
        tasks.unshift('scss');
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
