var plugins = require('gulp-load-plugins')(),
    scssToLess = require('../util/scssToLess');

module.exports = function(gulp, config) {
    // creates a less file for theme roller
    gulp.task('themeroller', function(){
        return gulp.src(config.themeroller.files)
            .pipe(plugins.if(config.sass.enabled, scssToLess()))
            .pipe(plugins.concat(config.themeroller.finalName + '.less'))
            .pipe(gulp.dest(config.paths.dist + config.assets.less));
    });
}
