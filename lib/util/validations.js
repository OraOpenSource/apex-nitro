const fs = require('fs');
const path = require('path');

module.exports = {

	// Validates if there is any file to process in the source folder
	isSrcFolderValid(config) {
		// Returns all files within a single dir
		const walkSync = (dir, filelist = []) => {
			fs.readdirSync(dir).forEach(file => {
				filelist = fs.statSync(path.join(dir, file)).isDirectory() ?
					walkSync(path.join(dir, file), filelist) :
					filelist.concat(path.join(dir, file));
			});
			return filelist;
		};

		/* eslint no-unused-vars: ["error", { "caughtErrors": "none" }] */

		try {
			const files = walkSync(path.resolve(config.srcFolder));

			if (files.length === 0) {
				throw new Error(`Your source folder contains zero file: ${path.resolve(config.srcFolder)}. Nothing to do...`);
			}

			return true;
		} catch (error) {
			throw new Error(`Error while reading the source folder: ${path.resolve(config.srcFolder)}. Please review the path.`);
		}
	},

	// Validates configuration for the upload feature
	upload(config) {
		const errorMessage = function (key) {
			return `Your apexnitro.config.json is missing ${key}. Please review ${process.cwd()}/apexnitro.config.json`;
		};

		if (!config.upload.path) {
			throw new Error(errorMessage('SQLcl path'));
		}

		if (!config.upload.connectionString) {
			throw new Error(errorMessage('database connection string'));
		}
	}
};
