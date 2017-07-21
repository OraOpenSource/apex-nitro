'use strict';

const npc = require('node-package-configurator');
const schema = require('../templates/schema');
const templates = require('../templates/templates');

module.exports = function (args) {
	const project = args[0];

	npc.init({
		modules: ['apex-nitro', 'afeb'],
		logo: 'https://raw.githubusercontent.com/OraOpenSource/apex-nitro/master/docs/header.png',
		project,
		jsonSchema: schema,
		mapping: templates.mapping(),
		primaryColorBG: '#fff',
		primaryColorText: '#9e9e9e'
	});
};
