/* eslint capitalized-comments: ["error", "never"] */

import test from 'ava';

// const fs = require('fs');
// const path = require('path');

const util = require('./lib/util/util');
const validations = require('./lib/util/validations');
// const launch = require('./lib/commands/launch');

// const originalCwd = process.cwd();

// recursive loop through a given folder to find all files
// round here https://stackoverflow.com/a/20525865/2524979
// function getFiles(dir, files = []) {
// 	fs.readdirSync(dir).forEach(filename => {
// 		const filepath = path.join(dir, filename);

// 		if (fs.statSync(filepath).isDirectory()) {
// 			getFiles(filepath, files);
// 		} else {
// 			files.push(path.resolve(filepath));
// 		}
// 	});

// 	return files;
// }

test('src-dist-invalid', t => {
	try {
		validations.srcDistFolders({
			srcFolder: 'test',
			distFolder: 'test'
		});
	} catch (error) {
		t.pass();
	}
});

test('pad-str', t => {
	if (util.padStr('test', '.js') === 'test.js' && util.padStr('test.js', '.js') === 'test.js') {
		t.pass();
	}
});
