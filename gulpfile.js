// APEX Gulp Stack

// 1. LIBRARIES
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    del = require('del'),
    runSequence = require('run-sequence'),
    browsersync = require('browser-sync').create(),
    clip = require('gulp-clip-empty-files'),
    path = require('path'),
    argv = require('yargs').argv,
    merge = require('merge-stream'),
    extend = require('node.extend'),
    util = require('./lib/util'),
    scssToLess = require('./lib/scssToLess'),
    rtlcss = require('./lib/rtlcss');


// 2. PREREQUISITES AND ERROR HANDLING
var defaultConfig = require('./default'),
    userConfig = require('./config'),
    config = extend(true, {}, defaultConfig, userConfig[argv.project]);

// command line syntax
if (typeof argv.project == "undefined") {
    console.log("The correct syntax is: npm start -- --project=yourProjectName");
    process.exit(1);
}

// project exists
if (typeof userConfig[argv.project] == "undefined") {
    console.log("Project", argv.project ,"doesn't exists in your config.json file.");
    process.exit(1);
}

// sass or less, not both
if (config.sass.enabled && config.less.enabled) {
    console.log("Choose either Sass or Less (not both) as the CSS preprocessor for project", argv.project);
    process.exit(1);
}

// missing project appURL
if (util.isEmptyObject(config.appURL)) {
    console.log("Missing appURL in your config.json file.");
}

// missing project srcFolder
if (util.isEmptyObject(config.srcFolder)) {
    console.log("Missing srcFolder in your config.json file.");
}

// missing project distFolder
if (util.isEmptyObject(config.distFolder)) {
    console.log("Missing distFolder in your config.json file.");
}

if((util.isEmptyObject(config.appURL))
|| (util.isEmptyObject(config.srcFolder))
|| (util.isEmptyObject(config.distFolder))) {
    process.exit(1);
}

// missing project header.packageJsonPath
if (config.header.enabled) {
    if (util.isEmptyObject(config.header.packageJsonPath)) {
        console.log("Missing packageJsonPath in your config.json file.");
        process.exit(1);
    } else {
        var pkg = require(config.header.packageJsonPath + "package.json");
        var banner = ['/*!',
          ' * <%= pkg.name %> - <%= pkg.description %>',
          ' * @version v<%= pkg.version %>',
          ' * @link <%= pkg.homepage %>',
          ' * @license <%= pkg.license %>',
          ' */',
          ''].join('\n');
    }
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
        sass: path.normalize('/sass/'),
        less: path.normalize('/less/'),
        img: path.normalize('/img/'),
        lib: path.normalize('/lib/')
    },
    allSubFolders = '**/',
    files = {
        js: path.normalize('*.js'),
        css: path.normalize('*.css'),
        scss: path.normalize('*.scss'),
        sass: path.normalize('*.sass'),
        less: path.normalize('*.less'),
        all: path.normalize('*.*'),
    },
    uglifyOptions = {
        preserveComments: "license"
    }
    sizeOptions = {
        showFiles: true
    },
    renameOptions = {
        suffix: '.min'
    },
    sassOptions = {
        sourcemap: true,
        includePaths: [path.normalize(config.sass.includePath)]
    },
    lessOptions = {
        paths: [path.normalize(config.less.includePath)]
    },
    cssnanoOptions = {
        safe: true
    },
    apexMiddleware = function (req, res, next) {
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
        .pipe(plugins.if(config.header.enabled, plugins.header(banner, { pkg : pkg } )))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.if(config.jsConcat.enabled, plugins.concat(config.jsConcat.finalName + '.js')))
        .pipe(plugins.size(sizeOptions))
        .pipe(plugins.sourcemaps.write(paths.sourcemaps))
        .pipe(gulp.dest(paths.dist + assets.js))
        .pipe(plugins.uglify(uglifyOptions)).on('error', function(e) {})
        .pipe(plugins.rename(renameOptions))
        .pipe(plugins.size(sizeOptions))
        .pipe(plugins.sourcemaps.write(paths.sourcemaps))
        .pipe(gulp.dest(paths.dist + assets.js));
});

// javascript & browsersync
gulp.task('js-browsersync', ['js'], function() {
    browsersync.reload();
});

// style
gulp.task('style', function() {
    var sourceFiles;

    if (config.sass.enabled) {
        sourceFiles = [
            paths.src + assets.scss + files.scss,
            paths.src + assets.sass + files.sass
        ];
    } else if (config.less.enabled) {
        sourceFiles = paths.src + assets.less + files.less;
    } else {
        sourceFiles = paths.src + assets.css + files.css;
    }

    var sourceStream = gulp.src(sourceFiles)
        .pipe(plugins.plumber())
        .pipe(plugins.if(config.header.enabled, plugins.header(banner, { pkg : pkg } )))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.if(config.sass.enabled, plugins.sass(sassOptions).on('error', plugins.sass.logError)))
        .pipe(plugins.if(config.less.enabled, plugins.less(lessOptions)))
        .pipe(plugins.if(config.cssConcat.enabled, plugins.concat(config.cssConcat.finalName + '.css')));

    var unmin = sourceStream
        .pipe(plugins.clone())
        .pipe(plugins.autoprefixer())
        .pipe(plugins.size(sizeOptions))
        .pipe(plugins.sourcemaps.write(paths.sourcemaps));

    var min = sourceStream
        .pipe(plugins.clone())
        .pipe(plugins.autoprefixer())
        .pipe(plugins.cssnano(cssnanoOptions))
        .pipe(plugins.rename(renameOptions))
        .pipe(plugins.size(sizeOptions))
        .pipe(plugins.sourcemaps.write(paths.sourcemaps));

    return merge(unmin, min)
        .pipe(clip())
        .pipe(gulp.dest(paths.dist + assets.css))
        .pipe(plugins.if(config.browsersync.enabled, browsersync.stream({match: allSubFolders + files.css})))
        .pipe(plugins.if(config.rtl.enabled, rtlcss()))
        .pipe(plugins.if(config.rtl.enabled, plugins.rename({suffix: '.rtl'})))
        .pipe(plugins.if(config.rtl.enabled, gulp.dest(paths.dist + assets.css)))
        .pipe(plugins.if(config.browsersync.enabled, browsersync.stream({match: allSubFolders + files.css})));
});

// copy img files as is
gulp.task('img', function() {
    return gulp.src(paths.src + assets.img + allSubFolders + files.all)
        .pipe(plugins.if(config.imageOptimization.enabled, plugins.imagemin()))
        .pipe(gulp.dest(paths.dist + assets.img));
});

// copy lib files as is
gulp.task('lib', function() {
    return gulp.src(paths.src + assets.lib + allSubFolders + files.all)
        .pipe(gulp.dest(paths.dist + assets.lib));
});

// creates a less file for theme roller
gulp.task('themeroller', function(){
    return gulp.src(config.themeroller.files)
        .pipe(plugins.if(config.sass.enabled, scssToLess()))
        .pipe(plugins.concat(config.themeroller.finalName + '.less'))
        .pipe(gulp.dest(paths.dist + assets.less));
});

// launch browsersync server
gulp.task('browsersync', function() {
    browsersync.init({
        port: config.browsersync.port,
        notify: config.browsersync.notify,
        proxy: {
            target: config.appURL,
            middleware: apexMiddleware
        },
        serveStatic: [config.distFolder],
        ui: {
            port: config.browsersync.uiPort,
            weinre: {
                port: config.browsersync.weinrePort
            }
        }
    });
});

// watch for changes
gulp.task('watch', function() {
    // browsersync support
    var jsWatch = (config.browsersync.enabled ? ['js-browsersync'] : ['js']);
    gulp.watch(allSubFolders + files.js, { cwd: paths.src + assets.js }, jsWatch);
    gulp.watch(allSubFolders + files.scss, { cwd: paths.src + assets.scss }, ['style']);
    gulp.watch(allSubFolders + files.sass, { cwd: paths.src + assets.sass }, ['style']);
    gulp.watch(allSubFolders + files.less, { cwd: paths.src + assets.less }, ['style']);
    gulp.watch(allSubFolders + files.css, { cwd: paths.src + assets.css }, ['style']);

    // theme roller support
    if (config.themeroller.enabled) {
        gulp.watch(allSubFolders + files.scss, { cwd: paths.src + assets.scss }, ['themeroller']);
        gulp.watch(allSubFolders + files.sass, { cwd: paths.src + assets.sass }, ['themeroller']);
        gulp.watch(allSubFolders + files.less, { cwd: paths.src + assets.less }, ['themeroller']);
    }

    // img and lib
    gulp.watch(allSubFolders + files.all, { cwd: paths.src + assets.img }, ['img']);
    gulp.watch(allSubFolders + files.all, { cwd: paths.src + assets.lib }, ['lib']);
});

// Default task: builds your app
gulp.task('default', function() {
    // default task order
    var tasks = ['js', 'style', 'img', 'lib'];

    // theme roller support for sass or less files
    if (config.themeroller.enabled && (config.sass.enabled || config.less.enabled)) {
        tasks.unshift('themeroller');
    }

    // browsersync support
    if (config.browsersync.enabled) {
        tasks.unshift('browsersync');
    }

    // run tasks
    runSequence('clean-dist', tasks, 'watch', function() {
        console.log("APEX Front-End Boost has successfully processed your files.");
    });
});
