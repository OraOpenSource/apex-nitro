const _get = require('lodash/get');
const _set = require('lodash/set');
const ajax = require('./ajax');
const util = require('./util');
const level1 = require('./level1');

module.exports = {
	// invokes a synchronous ajax process that hangs for 5 seconds
	ajaxSync: () => {
		ajax.sync()
			.then(data => {
				console.log('ajaxSync is resolved:', data);
			}, util.error);
	},

	// invokes an asynchronous ajax process that hangs for 5 seconds
	ajaxAsync: () => {
		ajax.async()
			.then(data => {
				console.log('ajaxAsync is resolved:', data);
			}, util.error);
	},

	// invokes two consecutive asynchronous ajax process that hangs for 5 seconds
	ajaxTwice: () => {
		ajax.async()
			.then(data => {
				console.log('ajaxTwice1 is resolved:', data);
				return ajax.async();
			}, util.error)
			.then(data => {
				console.log('ajaxTwice2 is resolved:', data);
			}, util.error);
	},

	// exposes the level1 module
	level1,

	// exposes a function that uses Lodash from npm
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
