/* eslint capitalized-comments: ["error", "never"] */

import test from 'ava';

const fs = require('fs');
const path = require('path');

const util = require('./lib/util/util');
const validations = require('./lib/util/validations');
const launch = require('./lib/commands/launch');

const originalCwd = process.cwd();

// recursive loop through a given folder to find all files
// round here https://stackoverflow.com/a/20525865/2524979
function getFiles(dir, files = []) {
	fs.readdirSync(dir).forEach(filename => {
		const filepath = path.join(dir, filename);

		if (fs.statSync(filepath).isDirectory()) {
			getFiles(filepath, files);
		} else {
			files.push(path.resolve(filepath));
		}
	});

	return files;
}

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

test.serial.cb('demo-basic', t => {
	t.plan(1);

	const dir = path.resolve('./examples/demo-basic');
	process.cwd = function () {
		return dir;
	};

	launch(() => {
		const expected = [
			path.resolve(dir, 'src/css/app.css'),
			path.resolve(dir, 'src/js/app.js'),
			path.resolve(dir, 'src/html/test.html')
		].sort();

		const files = getFiles(path.resolve(dir, 'src'));
		files.sort();

		process.cwd = function () {
			return originalCwd;
		};

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-empty-src', t => {
	t.plan(1);

	const dir = path.resolve('./examples/demo-empty-src');
	process.cwd = function () {
		return dir;
	};

	launch(() => {
		const expected = [];

		const files = (
			fs.existsSync(path.resolve(dir, 'dist')) ?
				getFiles(path.resolve(dir, 'dist')) :
				undefined
		);

		process.cwd = function () {
			return originalCwd;
		};

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-simple', t => {
	t.plan(1);

	const dir = path.resolve('./examples/demo-simple');
	process.cwd = function () {
		return dir;
	};

	launch(() => {
		const expected = [
			path.resolve(dir, 'dist/css/app.css'),
			path.resolve(dir, 'dist/css/app.css.map'),
			path.resolve(dir, 'dist/css/app.min.css'),
			path.resolve(dir, 'dist/js/app.js'),
			path.resolve(dir, 'dist/js/app.js.map'),
			path.resolve(dir, 'dist/js/app.min.js')
		].sort();

		const files = getFiles(path.resolve(dir, 'dist'));
		files.sort();

		process.cwd = function () {
			return originalCwd;
		};

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-subfolders', t => {
	t.plan(1);

	const dir = path.resolve('./examples/demo-subfolders');
	process.cwd = function () {
		return dir;
	};

	launch(() => {
		const expected = [
			path.resolve(dir, 'dist/css/file.css'),
			path.resolve(dir, 'dist/css/file.css.map'),
			path.resolve(dir, 'dist/css/file.min.css'),
			path.resolve(dir, 'dist/css/sub1/file1.css'),
			path.resolve(dir, 'dist/css/sub1/file1.css.map'),
			path.resolve(dir, 'dist/css/sub1/file1.min.css'),
			path.resolve(dir, 'dist/css/sub2/file2.css'),
			path.resolve(dir, 'dist/css/sub2/file2.css.map'),
			path.resolve(dir, 'dist/css/sub2/file2.min.css'),
			path.resolve(dir, 'dist/js/file.js'),
			path.resolve(dir, 'dist/js/file.js.map'),
			path.resolve(dir, 'dist/js/file.min.js'),
			path.resolve(dir, 'dist/js/sub1/file1.js'),
			path.resolve(dir, 'dist/js/sub1/file1.js.map'),
			path.resolve(dir, 'dist/js/sub1/file1.min.js'),
			path.resolve(dir, 'dist/js/sub2/file2.js'),
			path.resolve(dir, 'dist/js/sub2/file2.js.map'),
			path.resolve(dir, 'dist/js/sub2/file2.min.js'),
			path.resolve(dir, 'dist/lib/sublib/lib.js')
		].sort();

		const files = getFiles(path.resolve(dir, 'dist'));
		files.sort();

		process.cwd = function () {
			return originalCwd;
		};

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-subfolders-concat', t => {
	t.plan(1);

	const dir = path.resolve('./examples/demo-subfolders-concat');
	process.cwd = function () {
		return dir;
	};

	launch(() => {
		const expected = [
			path.resolve(dir, 'dist/css/app.css'),
			path.resolve(dir, 'dist/css/app.css.map'),
			path.resolve(dir, 'dist/css/app.min.css'),
			path.resolve(dir, 'dist/js/app.js'),
			path.resolve(dir, 'dist/js/app.js.map'),
			path.resolve(dir, 'dist/js/app.min.js'),
			path.resolve(dir, 'dist/lib/sublib/lib.js')
		].sort();

		const files = getFiles(path.resolve(dir, 'dist'));
		files.sort();

		process.cwd = function () {
			return originalCwd;
		};

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-concat', t => {
	t.plan(1);

	const dir = path.resolve('./examples/demo-concat');
	process.cwd = function () {
		return dir;
	};

	launch(() => {
		const expected = [
			path.resolve(dir, 'dist/css/app.css'),
			path.resolve(dir, 'dist/css/app.css.map'),
			path.resolve(dir, 'dist/css/app.min.css'),
			path.resolve(dir, 'dist/js/app.js'),
			path.resolve(dir, 'dist/js/app.js.map'),
			path.resolve(dir, 'dist/js/app.min.js')
		].sort();

		const files = getFiles(path.resolve(dir, 'dist'));
		files.sort();

		process.cwd = function () {
			return originalCwd;
		};

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-header', t => {
	t.plan(1);

	const dir = path.resolve('./examples/demo-header');
	process.cwd = function () {
		return dir;
	};

	launch(() => {
		const expected = [
			path.resolve(dir, 'dist/css/app.css'),
			path.resolve(dir, 'dist/css/app.css.map'),
			path.resolve(dir, 'dist/css/app.min.css'),
			path.resolve(dir, 'dist/js/app.js'),
			path.resolve(dir, 'dist/js/app.js.map'),
			path.resolve(dir, 'dist/js/app.min.js')
		].sort();

		const files = getFiles(path.resolve(dir, 'dist'));
		files.sort();

		process.cwd = function () {
			return originalCwd;
		};

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-less', t => {
	t.plan(1);

	const dir = path.resolve('./examples/demo-less');
	process.cwd = function () {
		return dir;
	};

	launch(() => {
		const expected = [
			path.resolve(dir, 'dist/css/app.css'),
			path.resolve(dir, 'dist/css/app.css.map'),
			path.resolve(dir, 'dist/css/app.min.css'),
			path.resolve(dir, 'dist/js/app.js'),
			path.resolve(dir, 'dist/js/app.js.map'),
			path.resolve(dir, 'dist/js/app.min.js')
		].sort();

		const files = getFiles(path.resolve(dir, 'dist'));
		files.sort();

		process.cwd = function () {
			return originalCwd;
		};

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-sass', t => {
	t.plan(1);

	const dir = path.resolve('./examples/demo-sass');
	process.cwd = function () {
		return dir;
	};

	launch(() => {
		const expected = [
			path.resolve(dir, 'dist/css/app.css'),
			path.resolve(dir, 'dist/css/app.css.map'),
			path.resolve(dir, 'dist/css/app.min.css'),
			path.resolve(dir, 'dist/js/app.js'),
			path.resolve(dir, 'dist/js/app.js.map'),
			path.resolve(dir, 'dist/js/app.min.js')
		].sort();

		const files = getFiles(path.resolve(dir, 'dist'));
		files.sort();

		process.cwd = function () {
			return originalCwd;
		};

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-error-js', t => {
	t.plan(1);

	const dir = path.resolve('./examples/demo-error-js');
	process.cwd = function () {
		return dir;
	};

	launch(() => {
		const expected = [
			path.resolve(dir, 'dist/css/app.css'),
			path.resolve(dir, 'dist/css/app.css.map'),
			path.resolve(dir, 'dist/css/app.min.css')
		].sort();

		const files = getFiles(path.resolve(dir, 'dist'));
		files.sort();

		process.cwd = function () {
			return originalCwd;
		};

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-warning-js', t => {
	t.plan(1);

	const dir = path.resolve('./examples/demo-warning-js');
	process.cwd = function () {
		return dir;
	};

	launch(() => {
		const expected = [
			path.resolve(dir, 'dist/css/app.css'),
			path.resolve(dir, 'dist/css/app.css.map'),
			path.resolve(dir, 'dist/css/app.min.css'),
			path.resolve(dir, 'dist/js/app.js'),
			path.resolve(dir, 'dist/js/app.js.map'),
			path.resolve(dir, 'dist/js/app.min.js')
		].sort();

		const files = getFiles(path.resolve(dir, 'dist'));
		files.sort();

		process.cwd = function () {
			return originalCwd;
		};

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-error-css', t => {
	t.plan(1);

	const dir = path.resolve('./examples/demo-error-css');
	process.cwd = function () {
		return dir;
	};

	launch(() => {
		const expected = [
			path.resolve(dir, 'dist/js/app.js'),
			path.resolve(dir, 'dist/js/app.js.map'),
			path.resolve(dir, 'dist/js/app.min.js')
		].sort();

		const files = getFiles(path.resolve(dir, 'dist'));
		files.sort();

		process.cwd = function () {
			return originalCwd;
		};

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-error-sass', t => {
	t.plan(1);

	const dir = path.resolve('./examples/demo-error-sass');
	process.cwd = function () {
		return dir;
	};

	launch(() => {
		const expected = [
			path.resolve(dir, 'dist/js/app.js'),
			path.resolve(dir, 'dist/js/app.js.map'),
			path.resolve(dir, 'dist/js/app.min.js')
		].sort();

		const files = getFiles(path.resolve(dir, 'dist'));
		files.sort();

		process.cwd = function () {
			return originalCwd;
		};

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-error-less', t => {
	t.plan(1);

	const dir = path.resolve('./examples/demo-error-less');
	process.cwd = function () {
		return dir;
	};

	launch(() => {
		const expected = [
			path.resolve(dir, 'dist/js/app.js'),
			path.resolve(dir, 'dist/js/app.js.map'),
			path.resolve(dir, 'dist/js/app.min.js')
		].sort();

		const files = getFiles(path.resolve(dir, 'dist'));
		files.sort();

		process.cwd = function () {
			return originalCwd;
		};

		t.deepEqual(files, expected);
		t.end();
	});
});
