const path = require('path');

module.exports = {
	getConfig() {
		try {
			const config = require(path.resolve(process.cwd(), 'apexnitro.config.json'));
			return config;
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
