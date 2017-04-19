const _get = require('lodash/get');
const _set = require('lodash/set');
const ajax = require('./ajax');
const util = require('./util');
const level1 = require('./level1');

module.exports = {
	ajaxSync: () => {
		ajax.sync()
			.then(data => {
				console.log('ajaxSync is resolved:', data);
			}, util.error);
	},

	ajaxAsync: () => {
		ajax.async()
			.then(data => {
				console.log('ajaxAsync is resolved:', data);
			}, util.error);
	},

	level1,

	lodash: () => {
		const object = {
			a: [{
				b: {
					c: 3
				}
			}]
		};

		console.log('object', JSON.stringify(object));
		console.log('lodash get a[0].b.c:', _get(object, 'a[0].b.c'));
		console.log('lodash set a[0].b.c: 4');

		_set(object, 'a[0].b.c', 4);

		console.log('lodash get a[0].b.c:', _get(object, 'a[0].b.c'));
		console.log('object', JSON.stringify(object));
	}
};
