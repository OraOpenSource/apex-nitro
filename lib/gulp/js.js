var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    templates = require('../templates/templates');

module.exports = function(config, browsersync) {
    var uglifyOptions = {
            preserveComments: "license"
        },
        renameOptions = {
            suffix: '.min'
        },
        sizeOptions = {
            showFiles: true
        };

    if (config.header.enabled) {
        var pkg = require(config.header.packageJsonPath),
        banner = templates.banner().join('\n');
    }

    // javascript
    gulp.task('js-gulp', function() {
        return gulp.src(config.srcFolder + "/js/*.js")
            .pipe(plugins.plumber())
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter('jshint-stylish'))
            .pipe(plugins.if(config.header.enabled, plugins.header(banner, { pkg : pkg } )))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.if(config.jsConcat.enabled, plugins.concat(config.jsConcat.finalName + '.js')))
            .pipe(plugins.size(sizeOptions))
            .pipe(plugins.sourcemaps.write("./"))
            .pipe(gulp.dest(config.distFolder + "/js/"))
            .pipe(plugins.uglify(uglifyOptions)).on('error', function(e) {})
            .pipe(plugins.rename(renameOptions))
            .pipe(plugins.size(sizeOptions))
            .pipe(plugins.sourcemaps.write("./"))
            .pipe(gulp.dest(config.distFolder + "/js/"));
    });

    // javascript & browsersync
    gulp.task('js', ['js-gulp'], function() {
        browsersync.reload();
    });
}
