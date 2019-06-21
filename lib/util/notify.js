const path = require('path');
const notifier = require('node-notifier');

module.exports = {
	launch() {
		notifier.notify({
			title: 'APEX Nitro',
			message: 'is now running.',
			icon: path.join(__dirname, '../../docs/img/apex-nitro-icon.png'),
			timeout: 3
		});
	},

	changeDetected() {
		notifier.notify({
			title: 'APEX Nitro',
			message: 'change detected, recompiling...',
			icon: path.join(__dirname, '../../docs/img/apex-nitro-icon.png'),
			timeout: 3
		});
	},

	injected() {
		notifier.notify({
			title: 'APEX Nitro',
			message: 'has injected your code unto the APEX page',
			icon: path.join(__dirname, '../../docs/img/apex-nitro-icon.png'),
			timeout: 3
		});
	},

	reloaded() {
		notifier.notify({
			title: 'APEX Nitro',
			message: 'has reloaded your APEX page',
			icon: path.join(__dirname, '../../docs/img/apex-nitro-icon.png'),
			timeout: 3
		});
	},

	error() {
		notifier.notify({
			title: 'APEX Nitro',
			message: 'There was an error with your code. Check the terminal for more info.',
			icon: path.join(__dirname, '../../docs/img/apex-nitro-icon-warning.png')
		});
	}
};
