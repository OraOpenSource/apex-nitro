import test from 'ava';

const path = require('path');
const configurator = require('json-local-configurator');

const templates = require('./lib/templates/templates');
const validations = require('./lib/util/validations');
const launch = require('./lib/commands/launch');

test('get-config-all', t => {
	const config = configurator.getConfig({
		module: 'afeb',
		mapping: templates.mapping()
	});

	if (config) {
		t.pass();
	}
});

test('get-config-project', t => {
	try {
		configurator.getConfig({
			module: 'afeb',
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

const testDemo = function (name) {
	test.serial.cb(name, t => {
		t.plan(1);

		launch([name], () => {
			t.pass();
			t.end();
		});
	});
};

testDemo('demo-simple');
testDemo('demo-concat');
testDemo('demo-header');
testDemo('demo-less');
testDemo('demo-sass');
testDemo('demo-webpack');
