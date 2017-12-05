'use strict';

const path = require('path');
const messages = require('../templates/messages');

module.exports = {
	notifySuccessJS() {
		return {
			title: messages.notifyTitle,
			message: messages.notifySuccessJS,
			icon: path.join(__dirname, '../../docs/img/apex-nitro-icon.png')
		};
	},

	notifySuccessCSS() {
		return {
			title: messages.notifyTitle,
			message: messages.notifySuccessCSS,
			icon: path.join(__dirname, '../../docs/img/apex-nitro-icon.png')
		};
	},

	notifySuccessOther() {
		return {
			title: messages.notifyTitle,
			message: messages.notifySuccessOther,
			icon: path.join(__dirname, '../../docs/img/apex-nitro-icon.png')
		};
	},

	notifyError() {
		return {
			title: messages.notifyTitle,
			message: messages.notifyError,
			icon: path.join(__dirname, '../../docs/img/apex-nitro-icon-warning.png')
		};
	},

	sassOptions(config) {
		return {
			sourcemap: true,
			includePaths: [
				path.resolve(config.css.sassIncludePath || '')
			]
		};
	},

	lessOptions(config) {
		return {
			paths: [
				path.resolve(config.css.lessIncludePath || '')
			]
		};
	},

	cssnanoOptions() {
		return {
			safe: true
		};
	},

	renameOptions() {
		return {
			suffix: '.min'
		};
	},

	uglifyOptions() {
		return {
			preserveComments: 'license'
		};
	}
};
