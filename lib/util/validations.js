const fs = require('fs');
const path = require('path');

module.exports = {
	header(config) {
		if (config.header && config.header.enabled) {
			try {
				require(path.resolve(config.header.packageJsonPath));
			} catch (error) {
				throw new Error(`Your package.json path (${config.header.packageJsonPath}) is invalid.`);
			}
		}
	},

	srcDistFolders(config) {
		if (path.resolve(config.srcFolder) === path.resolve(config.distFolder)) {
			throw new Error(`Your source folder (${path.resolve(config.srcFolder)}) cannot be equal to your distributable folder (${path.resolve(config.distFolder)}).`);
		}
	},

	validFilesArray(config) {
		if (config.themeroller && config.themeroller.files.length > 0) {
			config.themeroller.files.forEach(value => {
				if (!fs.existsSync(value)) {
					throw new Error(`Your theme roller array contains an invalid file: ${value}`);
				}
			});
		}
	},

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

		try {
			const files = walkSync(path.resolve(config.srcFolder));

			if (files.length === 0) {
				console.error(`Your source folder contains zero file: ${path.resolve(config.srcFolder)}. Nothing to do...`);
			}

			return files.length > 0;
		} catch (error) {
			console.error(`Error while reading the source folder: ${path.resolve(config.srcFolder)}. Please review the path.`);
			return false;
		}
	},

	// Validates configuration for the publish feature
	publish(config) {
		const errorMessage = function (key) {
			return `Your apexnitro.config.json is missing ${key}. Please review your project apexnitro.config.json`;
		};

		if (!config.publish || !config.publish.path) {
			throw new Error(errorMessage('SQLcl path'));
		} else if (config.publish.connectionType === 'basic') {
			if (!config.publish.username) {
				throw new Error(errorMessage('database username'));
			}
		} else if (config.publish.connectionType === 'custom') {
			if (!config.publish.connectionString) {
				throw new Error(errorMessage('database connection string'));
			}
		}
	}
};
