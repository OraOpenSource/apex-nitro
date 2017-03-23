'use strict';

const configurator = require('json-local-configurator');
const schema = require('../templates/schema');

// AFEB - config
module.exports = function (args) {
	const project = args[0];

	configurator.init({
		module: 'afeb',
		project,
		jsonSchema: schema
	});
};
