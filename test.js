/* eslint capitalized-comments: ["error", "never"] */

import test from 'ava';

const fs = require('fs');
const path = require('path');
const npc = require('node-package-configurator');

const util = require('./lib/util/util');
const templates = require('./lib/templates/templates');
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

test('get-config-all', t => {
	const config = npc.getConfig({
		modules: ['apex-nitro', 'afeb'],
		mapping: templates.mapping()
	});

	if (config) {
		t.pass();
	}
});

test('get-config-project', t => {
	try {
		npc.getConfig({
			modules: ['apex-nitro', 'afeb'],
			project: 'invalidproject',
			mapping: templates.mapping()
		});
	} catch (err) {
		if (err instanceof TypeError) {
			t.pass();
		}
	}
});

test('cli-project-syntax', t => {
	validations.cliProjectSyntax('project', 'syntax');
	t.pass();
});

test('cli-project-syntax-invalid', t => {
	try {
		validations.cliProjectSyntax(undefined, 'syntax');
	} catch (err) {
		if (err instanceof TypeError) {
			t.pass();
		}
	}
});

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
	} catch (err) {
		t.pass();
	}
});

test('src-dist-invalid', t => {
	try {
		validations.srcDistFolders({
			srcFolder: 'test',
			distFolder: 'test'
		});
	} catch (err) {
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

	const config = {
		mode: 'basic',
		appURL: 'https://apex.oracle.com/pls/apex/f?p=105990:102',
		srcFolder: path.resolve('./examples/demo-basic/src'),
		js: {
			processor: 'default',
			concat: false,
			library: false
		},
		css: {
			language: 'css',
			concat: false
		},
		browsersync: {
			notify: false,
			ghostMode: false
		},
		header: {
			enabled: false
		},
		apex: {
			openBuilder: false
		}
	};

	launch(['demo-basic'], undefined, config, () => {
		const expected = [
			path.resolve('./examples/demo-basic/src/css/app.css'),
			path.resolve('./examples/demo-basic/src/js/app.js')
		].sort();

		const files = getFiles(path.resolve('./examples/demo-basic/src/'));
		files.sort();

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-empty-src', t => {
	t.plan(1);

	const config = {
		mode: 'advanced',
		appURL: 'https://apex.oracle.com/pls/apex/f?p=105990:102',
		srcFolder: path.resolve('./examples/demo-empty-src/src'),
		distFolder: path.resolve('./examples/demo-empty-src/dist'),
		js: {
			processor: 'default',
			concat: false,
			library: false
		},
		css: {
			language: 'css',
			concat: false
		},
		browsersync: {
			notify: false,
			ghostMode: false
		},
		header: {
			enabled: false
		},
		apex: {
			openBuilder: false
		}
	};

	launch(['demo-empty-src'], undefined, config, () => {
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

	const config = {
		mode: 'basic',
		appURL: 'https://apex.oracle.com/pls/apex/f?p=105990:102',
		srcFolder: path.resolve('./examples/demo-invalid-dir/'),
		js: {
			processor: 'default',
			concat: false,
			library: false
		},
		css: {
			language: 'css',
			concat: false
		},
		browsersync: {
			notify: false,
			ghostMode: false
		},
		header: {
			enabled: false
		},
		apex: {
			openBuilder: false
		}
	};

	launch(['demo-invalid-dir'], undefined, config, () => {
		t.pass();
		t.end();
	});
});

test.serial.cb('demo-simple', t => {
	t.plan(1);

	const config = {
		mode: 'advanced',
		appURL: 'https://apex.oracle.com/pls/apex/f?p=105990:101',
		srcFolder: path.resolve('./examples/demo-simple/src'),
		distFolder: path.resolve('./examples/demo-simple/dist'),
		js: {
			processor: 'default',
			concat: false,
			library: false
		},
		css: {
			language: 'css',
			concat: false
		},
		browsersync: {
			notify: false,
			ghostMode: false
		},
		header: {
			enabled: false
		},
		apex: {
			openBuilder: false
		}
	};

	launch(['demo-simple'], undefined, config, () => {
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

	const config = {
		mode: 'advanced',
		appURL: 'https://apex.oracle.com/pls/apex/f?p=105990:101',
		srcFolder: path.resolve('./examples/demo-subfolders/src'),
		distFolder: path.resolve('./examples/demo-subfolders/dist'),
		js: {
			processor: 'default',
			concat: false,
			library: false
		},
		css: {
			language: 'css',
			concat: false
		},
		browsersync: {
			notify: false,
			ghostMode: false
		},
		header: {
			enabled: false
		},
		apex: {
			openBuilder: false
		}
	};

	launch(['demo-subfolders'], undefined, config, () => {
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

	const config = {
		mode: 'advanced',
		appURL: 'https://apex.oracle.com/pls/apex/f?p=105990:101',
		srcFolder: path.resolve('./examples/demo-subfolders-concat/src'),
		distFolder: path.resolve('./examples/demo-subfolders-concat/dist'),
		js: {
			processor: 'default',
			concat: true,
			concatFilename: 'app.js'
		},
		css: {
			language: 'css',
			concat: true,
			concatFilename: 'app'
		},
		browsersync: {
			notify: false,
			ghostMode: false
		},
		header: {
			enabled: false
		},
		apex: {
			openBuilder: false
		}
	};

	launch(['demo-subfolders-concat'], undefined, config, () => {
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

	const config = {
		mode: 'advanced',
		appURL: 'https://apex.oracle.com/pls/apex/f?p=105990:101',
		srcFolder: path.resolve('./examples/demo-concat/src'),
		distFolder: path.resolve('./examples/demo-concat/dist'),
		js: {
			processor: 'default',
			concat: true,
			concatFilename: 'app'
		},
		css: {
			language: 'css',
			concat: true,
			concatFilename: 'app'
		},
		browsersync: {
			notify: false,
			ghostMode: false
		},
		header: {
			enabled: false
		},
		apex: {
			openBuilder: false
		}
	};

	launch(['demo-concat'], undefined, config, () => {
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

	const config = {
		mode: 'advanced',
		appURL: 'https://apex.oracle.com/pls/apex/f?p=105990:101',
		srcFolder: path.resolve('./examples/demo-header/src'),
		distFolder: path.resolve('./examples/demo-header/dist'),
		js: {
			processor: 'default',
			concat: true,
			concatFilename: 'app'
		},
		css: {
			language: 'css',
			concat: true,
			concatFilename: 'app'
		},
		browsersync: {
			notify: false,
			ghostMode: false
		},
		header: {
			enabled: true,
			packageJsonPath: path.resolve('./examples/demo-header/package.json')
		},
		apex: {
			openBuilder: false
		}
	};

	launch(['demo-header'], undefined, config, () => {
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

	const config = {
		mode: 'advanced',
		appURL: 'https://apex.oracle.com/pls/apex/f?p=105990:101',
		srcFolder: path.resolve('./examples/demo-less/src'),
		distFolder: path.resolve('./examples/demo-less/dist'),
		js: {
			processor: 'default',
			concat: false
		},
		css: {
			language: 'less',
			concat: false
		},
		browsersync: {
			notify: false,
			ghostMode: false
		},
		header: {
			enabled: false
		},
		apex: {
			openBuilder: false,
			apexDestination: 'application'
		}
	};

	launch(['demo-less'], undefined, config, () => {
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

	const config = {
		mode: 'advanced',
		appURL: 'https://apex.oracle.com/pls/apex/f?p=105990:101',
		srcFolder: path.resolve('./examples/demo-sass/src'),
		distFolder: path.resolve('./examples/demo-sass/dist'),
		js: {
			processor: 'default',
			concat: false
		},
		css: {
			language: 'sass',
			concat: false
		},
		browsersync: {
			notify: false,
			ghostMode: false
		},
		header: {
			enabled: false
		},
		apex: {
			openBuilder: false
		}
	};

	launch(['demo-sass'], undefined, config, () => {
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

	const config = {
		mode: 'advanced',
		appURL: 'https://apex.oracle.com/pls/apex/f?p=105990:101',
		srcFolder: path.resolve('./examples/demo-typescript/src'),
		distFolder: path.resolve('./examples/demo-typescript/dist'),
		js: {
			processor: 'typescript',
			tsConcat: true,
			tsConcatFilename: 'app'
		},
		css: {
			language: 'css',
			concat: false
		},
		browsersync: {
			notify: false,
			ghostMode: false
		},
		header: {
			enabled: false
		},
		apex: {
			openBuilder: false
		}
	};

	launch(['demo-typescript'], undefined, config, () => {
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

test.serial.cb('demo-webpack', t => {
	t.plan(1);

	const config = {
		mode: 'advanced',
		appURL: 'https://apex.oracle.com/pls/apex/f?p=105990:1',
		srcFolder: path.resolve('./examples/demo-webpack/src'),
		distFolder: path.resolve('./examples/demo-webpack/dist'),
		js: {
			processor: 'webpack',
			concat: false,
			entries: [path.resolve('./examples/demo-webpack/src/js/app.js')],
			bundleFilename: 'bundle',
			library: true,
			libraryName: 'demo'
		},
		css: {
			language: 'css',
			concat: false
		},
		browsersync: {
			notify: false,
			ghostMode: false
		},
		header: {
			enabled: false
		},
		apex: {
			openBuilder: false
		}
	};

	launch(['demo-webpack'], undefined, config, () => {
		const expected = [
			path.resolve('./examples/demo-webpack/dist/css/app.css'),
			path.resolve('./examples/demo-webpack/dist/css/app.css.map'),
			path.resolve('./examples/demo-webpack/dist/css/app.min.css'),
			path.resolve('./examples/demo-webpack/dist/img/banana.gif'),
			path.resolve('./examples/demo-webpack/dist/js/bundle.js'),
			path.resolve('./examples/demo-webpack/dist/js/bundle.js.map'),
			path.resolve('./examples/demo-webpack/dist/js/bundle.min.js')
		].sort();

		const files = getFiles(path.resolve('./examples/demo-webpack/dist/'));
		files.sort();

		t.deepEqual(files, expected);
		t.end();
	});
});

test.serial.cb('demo-error-js', t => {
	t.plan(1);

	const config = {
		mode: 'advanced',
		appURL: 'https://apex.oracle.com/pls/apex/f?p=105990:101',
		srcFolder: path.resolve('./examples/demo-error-js/src'),
		distFolder: path.resolve('./examples/demo-error-js/dist'),
		js: {
			processor: 'default',
			concat: false,
			library: false
		},
		css: {
			language: 'css',
			concat: false
		},
		browsersync: {
			notify: false,
			ghostMode: false
		},
		header: {
			enabled: false
		},
		apex: {
			openBuilder: false
		}
	};

	launch(['demo-error-js'], undefined, config, () => {
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

	const config = {
		mode: 'advanced',
		appURL: 'https://apex.oracle.com/pls/apex/f?p=105990:101',
		srcFolder: path.resolve('./examples/demo-warning-js/src'),
		distFolder: path.resolve('./examples/demo-warning-js/dist'),
		js: {
			processor: 'default',
			concat: false,
			library: false
		},
		css: {
			language: 'css',
			concat: false
		},
		browsersync: {
			notify: false,
			ghostMode: false
		},
		header: {
			enabled: false
		},
		apex: {
			openBuilder: false
		}
	};

	launch(['demo-warning-js'], undefined, config, () => {
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

	const config = {
		mode: 'advanced',
		appURL: 'https://apex.oracle.com/pls/apex/f?p=105990:101',
		srcFolder: path.resolve('./examples/demo-error-css/src'),
		distFolder: path.resolve('./examples/demo-error-css/dist'),
		js: {
			processor: 'default',
			concat: false,
			library: false
		},
		css: {
			language: 'css',
			concat: false
		},
		browsersync: {
			notify: false,
			ghostMode: false
		},
		header: {
			enabled: false
		},
		apex: {
			openBuilder: false
		}
	};

	launch(['demo-error-css'], undefined, config, () => {
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

	const config = {
		mode: 'advanced',
		appURL: 'https://apex.oracle.com/pls/apex/f?p=105990:101',
		srcFolder: path.resolve('./examples/demo-error-sass/src'),
		distFolder: path.resolve('./examples/demo-error-sass/dist'),
		js: {
			processor: 'default',
			concat: false,
			library: false
		},
		css: {
			language: 'sass',
			concat: false
		},
		browsersync: {
			notify: false,
			ghostMode: false
		},
		header: {
			enabled: false
		},
		apex: {
			openBuilder: false
		}
	};

	launch(['demo-error-sass'], undefined, config, () => {
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

	const config = {
		mode: 'advanced',
		appURL: 'https://apex.oracle.com/pls/apex/f?p=105990:101',
		srcFolder: path.resolve('./examples/demo-error-less/src'),
		distFolder: path.resolve('./examples/demo-error-less/dist'),
		js: {
			processor: 'default',
			concat: false,
			library: false
		},
		css: {
			language: 'less',
			concat: false
		},
		browsersync: {
			notify: false,
			ghostMode: false
		},
		header: {
			enabled: false
		},
		apex: {
			openBuilder: false
		}
	};

	launch(['demo-error-less'], undefined, config, () => {
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

	const config = {
		mode: 'advanced',
		appURL: 'https://apex.oracle.com/pls/apex/f?p=105990:101',
		srcFolder: path.resolve('./examples/demo-error-typescript/src'),
		distFolder: path.resolve('./examples/demo-error-typescript/dist'),
		js: {
			processor: 'typescript',
			concat: false,
			library: false
		},
		css: {
			language: 'css',
			concat: false
		},
		browsersync: {
			notify: false,
			ghostMode: false
		},
		header: {
			enabled: false
		},
		apex: {
			openBuilder: false
		}
	};

	launch(['demo-error-typescript'], undefined, config, () => {
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

test.serial.cb('demo-error-webpack', t => {
	t.plan(1);

	const config = {
		mode: 'advanced',
		appURL: 'https://apex.oracle.com/pls/apex/f?p=105990:101',
		srcFolder: path.resolve('./examples/demo-error-webpack/src'),
		distFolder: path.resolve('./examples/demo-error-webpack/dist'),
		js: {
			processor: 'webpack',
			concat: false,
			entries: [path.resolve('./examples/demo-error-webpack/src/js/app.js')],
			bundleFilename: 'bundle',
			library: true,
			libraryName: 'demo'
		},
		css: {
			language: 'css',
			concat: false
		},
		browsersync: {
			notify: false,
			ghostMode: false
		},
		header: {
			enabled: false
		},
		apex: {
			openBuilder: false
		}
	};

	launch(['demo-error-webpack'], undefined, config, () => {
		const expected = [
			path.resolve('./examples/demo-error-webpack/dist/css/app.css'),
			path.resolve('./examples/demo-error-webpack/dist/css/app.css.map'),
			path.resolve('./examples/demo-error-webpack/dist/css/app.min.css')
		].sort();

		const files = getFiles(path.resolve('./examples/demo-error-webpack/dist/'));
		files.sort();

		t.deepEqual(files, expected);
		t.end();
	});
});
