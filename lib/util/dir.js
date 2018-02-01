'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
	// Ensures that the directory structure exists for a given file
	makeDirectoryStructure(dir) {
		if (dir) {
			// Get the parent directory
			const dirname = path.dirname(dir);

			// If that parent directory exists, check if we can create the current directory
			if (fs.existsSync(dirname)) {
				if (!fs.existsSync(dir)) {
					fs.mkdirSync(dir);
				}

				// Then we're all good
				return true;
			}

			// Parent directory does not exists, so let's create it recursively
			this.makeDirectoryStructure(dirname);
			fs.mkdirSync(dirname);
		}
	}
};
