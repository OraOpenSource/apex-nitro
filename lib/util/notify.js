const path = require('path');
const notifier = require('node-notifier');

const messages = {
	title: 'APEX Nitro',
	launched: 'is now running.',
	changeDetected: 'change detected, recompiling.',
	recompiled: 'has recompiled your code',
	error: 'There was an error with your code. Check the terminal for more info.'
};

module.exports = {
	launch() {
		notifier.notify({
			title: messages.title,
			message: messages.launched,
			icon: path.join(__dirname, '../../docs/img/apex-nitro-icon.png'),
			timeout: 2
		});
	},

	changeDetected() {
		notifier.notify({
			title: messages.title,
			message: messages.changeDetected,
			icon: path.join(__dirname, '../../docs/img/apex-nitro-icon.png'),
			timeout: 2
		});
	},

	recompiled() {
		notifier.notify({
			title: messages.title,
			message: messages.recompiled,
			icon: path.join(__dirname, '../../docs/img/apex-nitro-icon.png'),
			timeout: 2
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
