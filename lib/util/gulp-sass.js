'use strict';

const path = require('path');
const chalk = require('chalk');
const PluginError = require('plugin-error');
const replaceExtension = require('replace-ext');
const stripAnsi = require('strip-ansi');
const through = require('through2');
const clonedeep = require('lodash/cloneDeep');
const applySourceMap = require('vinyl-sourcemaps-apply');

const PLUGIN_NAME = 'gulp-sass';

// ////////////////////////////
// Main Gulp Sass function
// ////////////////////////////
const gulpSass = function gulpSass(options, sync) {
	return through.obj((file, enc, cb) => {
		if (file.isNull()) {
			return cb(null, file);
		}
		if (file.isStream()) {
			return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
		}
		if (path.basename(file.path).indexOf('_') === 0) {
			return cb();
		}
		if (file.contents.length === 0) {
			file.path = replaceExtension(file.path, '.css');
			return cb(null, file);
		}

		let	callback;
		let	result;

		const opts = clonedeep(options || {});
		opts.data = file.contents.toString();

		// We set the file path here so that libsass can correctly resolve import paths
		opts.file = file.path;

		// Ensure `indentedSyntax` is true if a `.sass` file
		if (path.extname(file.path) === '.sass') {
			opts.indentedSyntax = true;
		}

		// Ensure file's parent directory in the include path
		if (opts.includePaths) {
			if (typeof opts.includePaths === 'string') {
				opts.includePaths = [opts.includePaths];
			}
		} else {
			opts.includePaths = [];
		}

		opts.includePaths.unshift(path.dirname(file.path));

		// Generate Source Maps if plugin source-map present
		if (opts.sourceMap && file.sourceMap) {
			opts.sourceMap = file.path;
			opts.omitSourceMapUrl = true;
			opts.sourceMapContents = true;
		}

		// ////////////////////////////
		// Handles returning the file to the stream
		// ////////////////////////////
		const filePush = function (sassObj) {
			let sassMap;
			let	sassMapFile;
			let	sassFileSrc;
			let	sassFileSrcPath;
			let	sourceFileIndex;

			// Build Source Maps!
			if (sassObj.map) {
				// Transform map into JSON
				sassMap = JSON.parse(sassObj.map.toString());
				// Grab the stdout and transform it into stdin
				sassMapFile = sassMap.file.replace(/^stdout$/, 'stdin');
				// Grab the base file name that's being worked on
				sassFileSrc = file.relative;
				// Grab the path portion of the file that's being worked on
				sassFileSrcPath = path.dirname(sassFileSrc);
				if (sassFileSrcPath) {
					// Prepend the path to all files in the sources array except the file that's being worked on
					sourceFileIndex = sassMap.sources.indexOf(sassMapFile);
					sassMap.sources = sassMap.sources.map((source, index) => {
						return (index === sourceFileIndex) ? source : path.join(sassFileSrcPath, source);
					});
				}

				// Remove 'stdin' from souces and replace with filenames!
				sassMap.sources = sassMap.sources.filter(src => {
					if (src !== 'stdin') {
						return src;
					}
					return '';
				});

				// Replace the map file with the original file name (but new extension)
				sassMap.file = replaceExtension(sassFileSrc, '.css');
				// Apply the map
				applySourceMap(file, sassMap);
			}

			file.contents = sassObj.css;
			file.path = replaceExtension(file.path, '.css');

			cb(null, file);
		};

		// ////////////////////////////
		// Handles error message
		// ////////////////////////////
		const errorM = function (error) {
			let relativePath = '';
			let filePath = error.file === 'stdin' ? file.path : error.file;
			let message = '';

			filePath = filePath ? filePath : file.path;
			relativePath = path.relative(process.cwd(), filePath);

			message += chalk.underline(relativePath) + '\n';
			message += error.formatted;

			error.messageFormatted = message;
			error.messageOriginal = error.message;
			error.message = stripAnsi(message);

			error.relativePath = relativePath;

			return cb(new PluginError(
				PLUGIN_NAME, error
			));
		};

		if (sync) {
			// ////////////////////////////
			// Sync Sass render
			// ////////////////////////////
			try {
				result = gulpSass.compiler.renderSync(opts);

				filePush(result);
			} catch (err) {
				return errorM(err);
			}
		} else {
			// ////////////////////////////
			// Async Sass render
			// ////////////////////////////
			callback = function (err, obj) {
				if (err) {
					return errorM(err);
				}
				filePush(obj);
			};

			gulpSass.compiler.render(opts, callback);
		}
	});
};

// ////////////////////////////
// Sync Sass render
// ////////////////////////////
gulpSass.sync = function (options) {
	return gulpSass(options, true);
};

// ////////////////////////////
// Log errors nicely
// ////////////////////////////
gulpSass.logError = function (error) {
	const message = new PluginError('sass', error.messageFormatted).toString();
	process.stderr.write(message + '\n');
	this.emit('end');
};

// ////////////////////////////
// Store compiler in a prop
// ////////////////////////////
gulpSass.compiler = require('node-sass');

module.exports = gulpSass;
