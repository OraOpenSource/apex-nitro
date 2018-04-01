'use strict';

module.exports = {
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
