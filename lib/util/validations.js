'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
	// Validates command line synta
	cliProjectSyntax(project, syntax) {
		if (typeof project === 'undefined') {
			throw new TypeError(`\nThe correct syntax is: ${syntax}`);
		}
	},

	// Validates missing project header package.json path
	header(config) {
		if (config.header && config.header.enabled) {
			try {
				require(path.resolve(config.header.packageJsonPath));
			} catch (err) {
				throw new Error(`Your project's package.json path is invalid.`);
			}
		}
	},

	// Validates missing project header package.json path
	validFilesArray(config) {
		if (config.themeroller && config.themeroller.files.length > 0) {
			config.themeroller.files.forEach(value => {
				if (!fs.existsSync(value)) {
					throw new Error(`Your project's theme roller array contains an invalid file: ${value}`);
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
			const files = walkSync(config.srcFolder);
			return files.length > 0;
		} catch (err) {
			console.error(`Error while reading the source folder ${config.srcFolder}.`);
			return false;
		}
	},

	// Validates configuration for the publish feature
	publish(config, project) {
		const errorMessage = function (key) {
			return `Your project configuration is missing ${key} information. Please review your project configuration by typing: apex-nitro config ${project}`;
		};

		if (!config.publish || !config.publish.path) {
			throw new Error(errorMessage('SQLcl path'));
		} else if (config.publish.connectionType === 'basic') {
			if (!config.publish.username) {
				throw new Error(errorMessage('database username'));
			}

			if (!config.publish.host) {
				throw new Error(errorMessage('database host'));
			}

			if (!config.publish.port) {
				throw new Error(errorMessage('database port'));
			}

			if (!config.publish.basicType === 'sid') {
				if (!config.publish.sid) {
					throw new Error(errorMessage('database sid'));
				}
			}

			if (!config.publish.basicType === 'service name') {
				if (!config.publish.serviceName) {
					throw new Error(errorMessage('database service name'));
				}
			}

			if (!config.publish.basicType === 'tns') {
				if (!config.publish.tns) {
					throw new Error(errorMessage('database tns'));
				}
			}
		} else if (config.publish.connectionType === 'custom') {
			if (!config.publish.connectionString) {
				throw new Error(errorMessage('database connection string'));
			}
		} else {
			throw new Error(errorMessage('database connection type'));
		}
	}
};
