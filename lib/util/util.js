const path = require('path');

const pool = {};

module.exports = {
	// Global getters and setters
	getPoolValue(key) {
		if (key) {
			return pool[key];
		}

		return pool;
	},

	setPoolValue(key, value) {
		pool[key] = value;
	},

	getConfig() {
		try {
			const config = require(path.resolve(process.cwd(), 'apexnitro.config.json'));
			this.setPoolValue('config', config);
		} catch (error) {
			throw new Error(`${path.resolve(process.cwd(), 'apexnitro.config.json')} does not exist. Type "apex-nitro init" to create it.`);
		}
	},

	// Ensures that the directory structure exists for a given file
	padStr(str, padStr) {
		if (str) {
			if (str.endsWith(padStr)) {
				return str;
			}

			return str.concat(padStr);
		}

		return '.';
	}
};
