/* eslint capitalized-comments: ["error", "never"] */

import test from 'ava';

const fs = require('fs');
const path = require('path');

const util = require('./lib/util/util');
const validations = require('./lib/util/validations');
const launch = require('./lib/commands/launch');

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

test('header-valid', t => {
	validations.header({
		header: {
			enabled: false
		}
	});
	t.pass();
});

test('header-valid2', t => {
	validations.header({
		header: {
			enabled: true,
			packageJsonPath: path.resolve(__dirname, 'package.json')
		}
	});
	t.pass();
});

test('header-invalid', t => {
	try {
		validations.header({
			header: {
				enabled: true
			}
		});
	} catch (error) {
		t.pass();
	}
});

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

	launch(() => {
		const expected = [
			path.resolve('./examples/demo-basic/src/css/app.css'),
			path.resolve('./examples/demo-basic/src/js/app.js'),
			path.resolve('./examples/demo-basic/src/html/test.html')
		].sort();

		const files = getFiles(path.resolve('./examples/demo-basic/src/'));
		files.sort();

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-empty-src', t => {
	t.plan(1);

	launch(() => {
		const expected = [];

		const files = (
			fs.existsSync('./examples/demo-empty-src/dist/') ?
				getFiles(path.resolve('./examples/demo-empty-src/dist/')) :
				undefined
		);

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-invalid-dir', t => {
	t.plan(1);

	launch(() => {
		t.pass();
		t.end();
	});
});

test.serial.cb('demo-simple', t => {
	t.plan(1);

	launch(() => {
		const expected = [
			path.resolve('./examples/demo-simple/dist/css/app.css'),
			path.resolve('./examples/demo-simple/dist/css/app.css.map'),
			path.resolve('./examples/demo-simple/dist/css/app.min.css'),
			path.resolve('./examples/demo-simple/dist/js/app.js'),
			path.resolve('./examples/demo-simple/dist/js/app.js.map'),
			path.resolve('./examples/demo-simple/dist/js/app.min.js')
		].sort();

		const files = getFiles(path.resolve('./examples/demo-simple/dist/'));
		files.sort();

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-subfolders', t => {
	t.plan(1);

	launch(() => {
		const expected = [
			path.resolve('./examples/demo-subfolders/dist/css/file.css'),
			path.resolve('./examples/demo-subfolders/dist/css/file.css.map'),
			path.resolve('./examples/demo-subfolders/dist/css/file.min.css'),
			path.resolve('./examples/demo-subfolders/dist/css/sub1/file1.css'),
			path.resolve('./examples/demo-subfolders/dist/css/sub1/file1.css.map'),
			path.resolve('./examples/demo-subfolders/dist/css/sub1/file1.min.css'),
			path.resolve('./examples/demo-subfolders/dist/css/sub2/file2.css'),
			path.resolve('./examples/demo-subfolders/dist/css/sub2/file2.css.map'),
			path.resolve('./examples/demo-subfolders/dist/css/sub2/file2.min.css'),
			path.resolve('./examples/demo-subfolders/dist/js/file.js'),
			path.resolve('./examples/demo-subfolders/dist/js/file.js.map'),
			path.resolve('./examples/demo-subfolders/dist/js/file.min.js'),
			path.resolve('./examples/demo-subfolders/dist/js/sub1/file1.js'),
			path.resolve('./examples/demo-subfolders/dist/js/sub1/file1.js.map'),
			path.resolve('./examples/demo-subfolders/dist/js/sub1/file1.min.js'),
			path.resolve('./examples/demo-subfolders/dist/js/sub2/file2.js'),
			path.resolve('./examples/demo-subfolders/dist/js/sub2/file2.js.map'),
			path.resolve('./examples/demo-subfolders/dist/js/sub2/file2.min.js'),
			path.resolve('./examples/demo-subfolders/dist/lib/sublib/lib.js')
		].sort();

		const files = getFiles(path.resolve('./examples/demo-subfolders/dist/'));
		files.sort();

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-subfolders-concat', t => {
	t.plan(1);

	launch(() => {
		const expected = [
			path.resolve('./examples/demo-subfolders-concat/dist/css/app.css'),
			path.resolve('./examples/demo-subfolders-concat/dist/css/app.css.map'),
			path.resolve('./examples/demo-subfolders-concat/dist/css/app.min.css'),
			path.resolve('./examples/demo-subfolders-concat/dist/js/app.js'),
			path.resolve('./examples/demo-subfolders-concat/dist/js/app.js.map'),
			path.resolve('./examples/demo-subfolders-concat/dist/js/app.min.js'),
			path.resolve('./examples/demo-subfolders-concat/dist/lib/sublib/lib.js')
		].sort();

		const files = getFiles(path.resolve('./examples/demo-subfolders-concat/dist/'));
		files.sort();

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-concat', t => {
	t.plan(1);

	launch(() => {
		const expected = [
			path.resolve('./examples/demo-concat/dist/css/app.css'),
			path.resolve('./examples/demo-concat/dist/css/app.css.map'),
			path.resolve('./examples/demo-concat/dist/css/app.min.css'),
			path.resolve('./examples/demo-concat/dist/js/app.js'),
			path.resolve('./examples/demo-concat/dist/js/app.js.map'),
			path.resolve('./examples/demo-concat/dist/js/app.min.js')
		].sort();

		const files = getFiles(path.resolve('./examples/demo-concat/dist/'));
		files.sort();

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-header', t => {
	t.plan(1);

	launch(() => {
		const expected = [
			path.resolve('./examples/demo-header/dist/css/app.css'),
			path.resolve('./examples/demo-header/dist/css/app.css.map'),
			path.resolve('./examples/demo-header/dist/css/app.min.css'),
			path.resolve('./examples/demo-header/dist/js/app.js'),
			path.resolve('./examples/demo-header/dist/js/app.js.map'),
			path.resolve('./examples/demo-header/dist/js/app.min.js')
		].sort();

		const files = getFiles(path.resolve('./examples/demo-header/dist/'));
		files.sort();

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-less', t => {
	t.plan(1);

	launch(() => {
		const expected = [
			path.resolve('./examples/demo-less/dist/css/app.css'),
			path.resolve('./examples/demo-less/dist/css/app.css.map'),
			path.resolve('./examples/demo-less/dist/css/app.min.css'),
			path.resolve('./examples/demo-less/dist/js/app.js'),
			path.resolve('./examples/demo-less/dist/js/app.js.map'),
			path.resolve('./examples/demo-less/dist/js/app.min.js')
		].sort();

		const files = getFiles(path.resolve('./examples/demo-less/dist/'));
		files.sort();

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-sass', t => {
	t.plan(1);

	launch(() => {
		const expected = [
			path.resolve('./examples/demo-sass/dist/css/app.css'),
			path.resolve('./examples/demo-sass/dist/css/app.css.map'),
			path.resolve('./examples/demo-sass/dist/css/app.min.css'),
			path.resolve('./examples/demo-sass/dist/js/app.js'),
			path.resolve('./examples/demo-sass/dist/js/app.js.map'),
			path.resolve('./examples/demo-sass/dist/js/app.min.js')
		].sort();

		const files = getFiles(path.resolve('./examples/demo-sass/dist/'));
		files.sort();

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-typescript', t => {
	t.plan(1);

	launch(() => {
		const expected = [
			path.resolve('./examples/demo-typescript/dist/css/app.css'),
			path.resolve('./examples/demo-typescript/dist/css/app.css.map'),
			path.resolve('./examples/demo-typescript/dist/css/app.min.css'),
			path.resolve('./examples/demo-typescript/dist/js/app.js'),
			path.resolve('./examples/demo-typescript/dist/js/app.js.map'),
			path.resolve('./examples/demo-typescript/dist/js/app.min.js')
		].sort();

		const files = getFiles(path.resolve('./examples/demo-typescript/dist/'));
		files.sort();

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-error-js', t => {
	t.plan(1);

	launch(() => {
		const expected = [
			path.resolve('./examples/demo-error-js/dist/css/app.css'),
			path.resolve('./examples/demo-error-js/dist/css/app.css.map'),
			path.resolve('./examples/demo-error-js/dist/css/app.min.css')
		].sort();

		const files = getFiles(path.resolve('./examples/demo-error-js/dist/'));
		files.sort();

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-warning-js', t => {
	t.plan(1);

	launch(() => {
		const expected = [
			path.resolve('./examples/demo-warning-js/dist/css/app.css'),
			path.resolve('./examples/demo-warning-js/dist/css/app.css.map'),
			path.resolve('./examples/demo-warning-js/dist/css/app.min.css'),
			path.resolve('./examples/demo-warning-js/dist/js/app.js'),
			path.resolve('./examples/demo-warning-js/dist/js/app.js.map'),
			path.resolve('./examples/demo-warning-js/dist/js/app.min.js')
		].sort();

		const files = getFiles(path.resolve('./examples/demo-warning-js/dist/'));
		files.sort();

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-error-css', t => {
	t.plan(1);

	launch(() => {
		const expected = [
			path.resolve('./examples/demo-error-css/dist/js/app.js'),
			path.resolve('./examples/demo-error-css/dist/js/app.js.map'),
			path.resolve('./examples/demo-error-css/dist/js/app.min.js')
		].sort();

		const files = getFiles(path.resolve('./examples/demo-error-css/dist/'));
		files.sort();

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-error-sass', t => {
	t.plan(1);

	launch(() => {
		const expected = [
			path.resolve('./examples/demo-error-sass/dist/js/app.js'),
			path.resolve('./examples/demo-error-sass/dist/js/app.js.map'),
			path.resolve('./examples/demo-error-sass/dist/js/app.min.js')
		].sort();

		const files = getFiles(path.resolve('./examples/demo-error-sass/dist/'));
		files.sort();

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-error-less', t => {
	t.plan(1);

	launch(() => {
		const expected = [
			path.resolve('./examples/demo-error-less/dist/js/app.js'),
			path.resolve('./examples/demo-error-less/dist/js/app.js.map'),
			path.resolve('./examples/demo-error-less/dist/js/app.min.js')
		].sort();

		const files = getFiles(path.resolve('./examples/demo-error-less/dist/'));
		files.sort();

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-error-typescript', t => {
	t.plan(1);

	launch(() => {
		const expected = [
			path.resolve('./examples/demo-error-typescript/dist/css/app.css'),
			path.resolve('./examples/demo-error-typescript/dist/css/app.css.map'),
			path.resolve('./examples/demo-error-typescript/dist/css/app.min.css')
		].sort();

		const files = getFiles(path.resolve('./examples/demo-error-typescript/dist/'));
		files.sort();

		t.deepEqual(files, expected);
		t.end();
	});
});
