'use strict';

const through = require('through2');
const gutil = require('gulp-util');

module.exports = function () {
	const scssToLess = function (file, enc, cb) {
		file.contents = Buffer.from(
			file.contents.toString()
			.replace(/\/s[ca]ss\//g, '/less/')
			.replace(/\.scss/g, '.less')
			.replace(/@mixin /g, '.')
			.replace(/@include /g, '.')
			.replace(/\$(\w+)/g, '@$1')
			.replace(/@extend ([\w\-.]+);/g, '&:extend( $1 );')
			.replace(/ !default/g, '')
			.replace(/',/g, ',')
			.replace(/'\./g, '.')
			.replace(/'/g, '"')
			.replace(/#{([^}]+)}/g, '$1')
			.replace(/~"@(\w+)"/g, '@{$1}')
			.replace(/adjust-hue\(/g, 'spin(')
			.replace(/.*alpha\(.*\r?\n/g, '')
			// Some extend cases are used with '%'. Need to replace with '.'
			.replace(/^%.*?/mg, '.')
			.replace(/@extend %([\w-]+);/g, '&:extend( .$1 );')
			// Delete lines containing ...
			.replace(/^.*@import.*$/mg, '')
			.replace(/^.*rgba\(@.*$/mg, '')
			// Fix for the calc function
			.replace(/calc\((.*?)\);/g, '~"calc($1)";')
			// SCSS if clause
			.replace(
				/(@if)([^{]+)({)/g,
				(match, m1, m2, m3) => {
					let result = '& when (';
					result += m2.replace(/[=][=]/g, '=');
					result += ')' + m3;
					return result;
				})
		);

		file.path = gutil.replaceExtension(file.path, '.scss');
		this.push(file);
		cb();
	};
	return through.obj(scssToLess);
};
