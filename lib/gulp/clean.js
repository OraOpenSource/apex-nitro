var del = require('del');

module.exports = function(gulp, config) {
    // cleans the dist directory
    gulp.task('clean', function() {
        return del([config.paths.dist], { force: true });
    });
}
