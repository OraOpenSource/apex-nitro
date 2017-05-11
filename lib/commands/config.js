'use strict';

const configurator = require('json-local-configurator');
const schema = require('../templates/schema');
const templates = require('../templates/templates');

module.exports = function (args) {
	const project = args[0];

	configurator.init({
		modules: ['apex-nitro', 'afeb'],
		project,
		jsonSchema: schema,
		mapping: templates.mapping()
	});
};
