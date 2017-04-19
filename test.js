import test from 'ava';

const path = require('path');
const configurator = require('json-local-configurator');

const templates = require('./lib/templates/templates');
const validations = require('./lib/util/validations');

test('getConfigAll', t => {
	const config = configurator.getConfig({
		module: 'afeb',
		mapping: templates.mapping()
	});

	if (config) {
		t.pass();
	}
});

test('getConfigProject', t => {
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

test('cliProjectSyntax', t => {
	validations.cliProjectSyntax('project', 'syntax');
	t.pass();
});

test('cliProjectSyntaxInvalid', t => {
	try {
		validations.cliProjectSyntax(undefined, 'syntax');
	} catch (err) {
		if (err instanceof TypeError) {
			t.pass();
		}
	}
});

test('headerValid', t => {
	validations.header({header: {enabled: false}});
	t.pass();
});

test('headerValid2', t => {
	validations.header({header: {enabled: true, packageJsonPath: path.resolve(__dirname, 'package.json')}});
	t.pass();
});

test('headerInvalid', t => {
	try {
		validations.header({header: {enabled: true}});
	} catch (err) {
		t.pass();
	}
});
