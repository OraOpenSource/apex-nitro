var plugins = require('gulp-load-plugins')(),
    templates = require('../templates/templates');

module.exports = function(gulp, config, browsersync) {
    var uglifyOptions = {
            preserveComments: "license"
        },
        renameOptions = {
            suffix: '.min'
        },
        sizeOptions = {
            showFiles: true
        },
        pkg = require(config.header.packageJsonPath),
        banner = templates.banner().join('\n');

    // javascript
    gulp.task('js', function() {
        return gulp.src(config.paths.src + config.assets.js + config.files.js)
            .pipe(plugins.plumber())
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter('jshint-stylish'))
            .pipe(plugins.if(config.header.enabled, plugins.header(banner, { pkg : pkg } )))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.if(config.jsConcat.enabled, plugins.concat(config.jsConcat.finalName + '.js')))
            .pipe(plugins.size(sizeOptions))
            .pipe(plugins.sourcemaps.write(config.paths.sourcemaps))
            .pipe(gulp.dest(config.paths.dist + config.assets.js))
            .pipe(plugins.uglify(uglifyOptions)).on('error', function(e) {})
            .pipe(plugins.rename(renameOptions))
            .pipe(plugins.size(sizeOptions))
            .pipe(plugins.sourcemaps.write(config.paths.sourcemaps))
            .pipe(gulp.dest(config.paths.dist + config.assets.js));
    });

    // javascript & browsersync
    gulp.task('js-browsersync', ['js'], function() {
        browsersync.reload();
    });
}
