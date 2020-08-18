/* eslint no-unused-vars: ["error", { "caughtErrors": "none" }] */

const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');

module.exports = {
	getConfig() {
		let config;
		let cred;

		try {
			config = require(path.resolve(process.cwd(), 'apexnitro.config.json'));
		} catch {
			throw new Error(`${path.resolve(process.cwd(), 'apexnitro.config.json')} does not exist. Type "apex-nitro init" to initialize your project.`);
		}

		if (config.upload.credentialsPath) {
			try {
				cred = require(path.resolve(config.upload.credentialsPath));
			} catch {
				fs.writeFileSync(
					path.resolve(process.cwd(), 'apexnitro.cred.json'),
					JSON.stringify({
						path: 'sql',
						username: 'your_username',
						password: 'your_password',
						connectionString: 'your_connection_string'
					}
					, null, 2)
				);
				console.log(`${path.resolve(process.cwd(), 'apexnitro.cred.json')} ${chalk.green('created')}.`);
			}
		}

		if (cred.path) {
			config.upload.path = cred.path;
		}

		if (cred.username) {
			config.upload.username = cred.username;
		}

		if (cred.password) {
			config.upload.password = cred.password;
		}

		if (cred.connectionString) {
			config.upload.connectionString = cred.connectionString;
		}

		return config;
	},

	// Ensures that the directory structure exists for a given file
	padStr(string, padString) {
		if (string) {
			if (string.endsWith(padString)) {
				return string;
			}

			return string.concat(padString);
		}

		return '.';
	}
};
