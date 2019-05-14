const path = require('path');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const scssToLess = require('../util/scss-to-less');

module.exports = function (config) {
	// Creates a less file for theme roller
	gulp.task('themeroller', () => {
		return gulp
			.src(config.themeroller.files)
			.pipe(plugins.if(config.css.language === 'sass', scssToLess()))
			.pipe(plugins.concat('themeroller.less'))
			.pipe(gulp.dest(path.resolve(config.distFolder, 'less')));
	});
};
