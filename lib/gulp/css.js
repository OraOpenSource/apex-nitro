var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    clip = require('gulp-clip-empty-files'),
    merge = require('merge-stream'),
    path = require('path'),
    templates = require('../templates/templates');

module.exports = function(config, browsersync) {
    var sassOptions = {
            sourcemap: true,
            includePaths: [path.normalize(config.sass.includePath)]
        },
        lessOptions = {
            paths: [path.normalize(config.less.includePath)]
        },
        cssnanoOptions = {
            safe: true
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

    gulp.task('style', function() {
        var sourceFiles = [];

        if (config.sass.enabled) {
            sourceFiles.push(config.paths.src + config.assets.scss + config.files.scss);
            sourceFiles.push(config.paths.src + config.assets.scss + config.files.sass);
        } else if (config.less.enabled) {
            sourceFiles.push(config.paths.src + config.assets.less + config.files.less);
        } else {
            sourceFiles.push(config.paths.src + config.assets.css + config.files.css);
        }

        // creates the source stream that will be used for unmin and min versions
        var sourceStream = gulp.src(sourceFiles)
            .pipe(plugins.plumber({
                errorHandler: function (err) {
                    console.log(err.toString());
                    this.emit('end');
                }
            }))
            .pipe(plugins.if(config.header.enabled, plugins.header(banner, { pkg : pkg } )))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.if(config.sass.enabled, plugins.sass(sassOptions).on('error', plugins.sass.logError)))
            .pipe(plugins.if(config.less.enabled, plugins.less(lessOptions)))
            .pipe(plugins.if(config.cssConcat.enabled, plugins.concat(config.cssConcat.finalName + '.css')));

        // creates the unmin css
        var unmin = sourceStream
            .pipe(plugins.clone())
            .pipe(plugins.autoprefixer())
            .pipe(plugins.size(sizeOptions))
            .pipe(plugins.sourcemaps.write(config.paths.sourcemaps));

        // creates the min css
        var min = sourceStream
            .pipe(plugins.clone())
            .pipe(plugins.autoprefixer())
            .pipe(plugins.cssnano(cssnanoOptions))
            .pipe(plugins.rename(renameOptions))
            .pipe(plugins.size(sizeOptions))
            .pipe(plugins.sourcemaps.write(config.paths.sourcemaps));

        // adds the unmin and the min version to the stream
        return merge(unmin, min)
            .pipe(clip())
            .pipe(gulp.dest(config.paths.dist + config.assets.css))
            .pipe(browsersync.stream({match: '**/' + config.files.css}));
    });
}
