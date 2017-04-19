var demo = demo || {};

(function(demo, $, undefined) {

	demo.util = {
		// Logs an error when a Promise is rejected
		error: function(err) {
			console.error("Promise is rejected:", err);
		}
	};

	demo.ajax = {
		// Function returning a Promise (ajax1)
		promise1: function(param) {
			return apex.server.process(
				"ajax1", {
					x01: param
				}
			);
		},

		// Function returning a Promise (ajax2)
		promise2: function(param) {
			return apex.server.process(
				"ajax2", {
					x01: param
				}
			);
		},

		// Function returning a Promise (ajax_error)
		promiseError: function() {
			return apex.server.process(
				"ajax_error", {}
			);
		}
	};

	demo.run = {
		// Function returning a Promise (ajax1)
		chain: function() {
			// Chaining the promises
			// Simulating a synchronous process chain
			demo.ajax.promise1(2)
				.then(function(data) {
					console.log("promise1 is resolved:", data);
					// passing the data from promise1 to promise2
					// and doubling the value of x01
					return demo.ajax.promise2(data.x01 * 2);
				}, demo.util.error)
				.then(function(data) {
					console.log("promise2 is resolved:", data);
					return demo.ajax.promiseError();
				}, demo.util.error)
				.then(function(data) {
					console.log("promiseError is resolved (Never gonna happen...):", data);
				}, demo.util.error);
		},

		all: function() {
			// Executing all the promises at the same time
			// Waiting for all of them to return
			Promise.all([demo.ajax.promise1(2), demo.ajax.promise2(4)])
				.then(function(data) {
					console.log("All Promises are resolved:", data);
				}).catch(demo.util.error);
		},

		// Function returning a Promise (ajax_error)
		race: function() {
			// Executing all the promises at the same time
			// Waiting for the **first** one to return
			Promise.race([demo.ajax.promise1(2), demo.ajax.promise2(4)])
				.then(function(data) {
					console.log("Fastest Promise is resolved:", data);
				}).catch(demo.util.error);
		}
	};

})(demo, apex.jQuery);
