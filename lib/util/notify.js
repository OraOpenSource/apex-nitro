const path = require('path');
const notifier = require('node-notifier');

const messages = {
	title: 'APEX Nitro',
	launched: 'is now running.',
	changeDetected: 'change detected, recompiling...',
	injected: 'has injected your code unto the APEX page',
	reloaded: 'has reloaded your APEX page',
	error: 'There was an error with your code. Check the terminal for more info.'
};

module.exports = {
	launch() {
		notifier.notify({
			title: messages.title,
			message: messages.launched,
			icon: path.join(__dirname, '../../docs/img/apex-nitro-icon.png'),
			timeout: 3
		});
	},

	changeDetected() {
		notifier.notify({
			title: messages.title,
			message: messages.changeDetected,
			icon: path.join(__dirname, '../../docs/img/apex-nitro-icon.png'),
			timeout: 3
		});
	},

	injected() {
		notifier.notify({
			title: messages.title,
			message: messages.injected,
			icon: path.join(__dirname, '../../docs/img/apex-nitro-icon.png'),
			timeout: 3
		});
	},

	reloaded() {
		notifier.notify({
			title: messages.title,
			message: messages.recompiled,
			icon: path.join(__dirname, '../../docs/img/apex-nitro-icon.png'),
			timeout: 3
		});
	},

	error() {
		notifier.notify({
			title: messages.title,
			message: messages.error,
			icon: path.join(__dirname, '../../docs/img/apex-nitro-icon-warning.png')
		});
	}
};
