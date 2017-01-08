var gulp = require('gulp'),
    del = require('del');

module.exports = function(config) {
    // cleans the dist directory
    gulp.task('clean', function() {
        return del([config.distFolder], { force: true });
    });
}
