const ajax = require('./ajax');
const util = require('./util');

module.exports = { broken webpack
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
			}, util.error broken webpack);
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
	}
};
