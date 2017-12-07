module.exports = {
	// Function returning a Promise (wait)
	sync() {
		return apex.server.process(
			'wait', {
				x01: 5
			}, {
				async: false
			}
		);
	},

	// Function returning a Promise (wait)
	async() {
		return apex.server.process(
			'wait', {
				x01: 5
			}
		);
	}
};
