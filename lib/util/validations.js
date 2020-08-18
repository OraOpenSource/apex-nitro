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
				throw new Error(
					`Your source folder contains zero file: ${path.resolve(
						config.srcFolder
					)}. Nothing to do...`
				);
			}

			return true;
		} catch {
			throw new Error(
				`Error while reading the source folder: ${path.resolve(
					config.srcFolder
				)}. Please review the path.`
			);
		}
	},

	// Validates if there is any file to process in the source folder
	isDistFolderValid(config) {
		if (path.resolve(config.distFolder) === path.resolve(config.srcFolder)) {
			throw new Error(
				`Your project configuration srcFolder (${path.resolve(
					config.srcFolder
				)}) is equal to distFolder (${path.resolve(
					config.distFolder
				)}). Please choose a different distFolder location.`
			);
		}

		const relative = path.relative(
			path.resolve(config.srcFolder),
			path.resolve(config.distFolder)
		);
		const isSubdir =
			relative && !relative.startsWith('..') && !path.isAbsolute(relative);

		if (isSubdir) {
			throw new Error(
				`Your project configuration distFolder (${path.resolve(
					config.distFolder
				)}) is inside the srcFolder (${path.resolve(
					config.srcFolder
				)}). Please choose a distFolder location outside of the srcFolder.`
			);
		}

		return true;
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
