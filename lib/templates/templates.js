'use strict';

const path = require('path');
const messages = require('./messages');

module.exports = {
	asciiLogo() {
		return String.raw`
    _     ____   _____ __  __    _   _  _  _
   / \   |  _ \ | ____|\ \/ /   | \ | |(_)| |_  _ __  ___
  / _ \  | |_) ||  _|   \  /    |  \| || || __|| '__|/ _ \
 / ___ \ |  __/ | |___  /  \    | |\  || || |_ | |  | (_) |
/_/   \_\|_|    |_____|/_/\_\   |_| \_||_| \__||_|   \___/
`;
	},

	banner() {
		return ['/*!',
			' * <%= pkg.name %> - <%= pkg.description %>',
			' * @author <%= pkg.author %>',
			' * @version v<%= pkg.version %>',
			' * @link <%= pkg.homepage %>',
			' * @license <%= pkg.license %>',
			' */',
			''
		];
	},

	bannerES6(pkg) {
		return `${pkg.name} - ${pkg.description}
@author ${pkg.author}
@version v${pkg.version}
@link ${pkg.homepage}
@license ${pkg.license}`;
	},

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

	mapping() {
		return [{
			oldKey: 'jsConcat.enabled',
			newKey: 'js.concat'
		},
		{
			oldKey: 'jsConcat.finalName',
			newKey: 'js.concatFilename'
		},
		{
			oldKey: 'cssConcat.enabled',
			newKey: 'css.concat'
		},
		{
			oldKey: 'cssConcat.finalName',
			newKey: 'css.concatFilename'
		},
		{
			oldKey: 'sass.includePath',
			newKey: 'css.sassIncludePath'
		},
		{
			oldKey: 'less.includePath',
			newKey: 'css.lessIncludePath'
		},
		{
			oldKey: 'sass.enabled',
			newKey: 'css.language',
			values: [{
				oldValue: true,
				newValue: 'sass'
			}]
		},
		{
			oldKey: 'less.enabled',
			newKey: 'css.language',
			values: [{
				oldValue: true,
				newValue: 'less'
			}]
		},
		{
			oldKey: 'jsConcat'
		},
		{
			oldKey: 'cssConcat'
		},
		{
			oldKey: 'sass'
		},
		{
			oldKey: 'less'
		},
		{
			newKey: 'mode',
			dependsOn: {
				key: 'distFolder',
				if: undefined,
				ifValue: 'basic',
				elseValue: 'advanced'
			}
		},
		{
			oldKey: 'apex.apexDestination',
			newKey: 'sqlcl.destination'
		},
		{
			oldKey: 'sqlcl',
			newKey: 'publish'
		},
		{
			oldKey: 'publish.apexDestination',
			newKey: 'publish.destination'
		}
		];
	}
};
