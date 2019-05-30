const path = require('path');

const messages = {
	notifyTitle: 'APEX Nitro',
	notifyLaunched: 'is now running.',
	notifyError: 'There was an error with your code. Check the terminal for more info.'
};

module.exports = {
	notifyLaunch() {
		return {
			title: messages.notifyTitle,
			message: messages.notifyLaunched,
			icon: path.join(__dirname, '../../docs/img/apex-nitro-icon.png'),
			timeout: 2
		};
	},

	notifyError() {
		return {
			title: messages.notifyTitle,
			message: messages.notifyError,
			icon: path.join(__dirname, '../../docs/img/apex-nitro-icon-warning.png')
		};
	}
};
