const path = require('path');
const opn = require('opn');

let isBuilderOpened = false;

module.exports = function (config, browsersync) {
	const openAPEXBuilder = function (protocol, host, paramString) {
		// Should only open the builder once
		if (!isBuilderOpened && config.apex.openBuilder) {
			// App 4000 is the APEX builder
			opn(
				protocol +
					'//' +
					host +
					paramString.substring(0, paramString.indexOf('f?p')) +
					'f?p=4000'
			);
			isBuilderOpened = true;
		}
	};

	const apexProxyReq = function (req, res) {
		openAPEXBuilder(req.agent.protocol, res.headers.host, req.path, res, req);
		req.setHeader('Origin', req.agent.protocol + '//' + req._headers.host);
		req.setHeader('APEX-Nitro', '//' + res.headers.host + '/');
	};

	// Launch browsersync server
	browsersync.init(
		{
			logPrefix: 'APEX Nitro',
			port: config.browsersync.port || 4000,
			notify: false,
			cors: true,
			proxy: {
				target: config.appUrl,
				proxyReq: [apexProxyReq]
			},
			serveStatic: [path.resolve(config.distFolder || config.srcFolder)],
			ui: false,
			ghostMode: config.browsersync.ghostMode,
			snippetOptions: {
				// Ignores all APEX builder apps
				blacklist: [
					'**/f?p=4000:*',
					'**/f?p=4050:*',
					'**/f?p=4155:*',
					'**/f?p=4300:*',
					'**/f?p=4350:*',
					'**/f?p=4400:*',
					'**/f?p=4411:*',
					'**/f?p=4500:*',
					'**/f?p=4550:*',
					'**/f?p=4700:*',
					'**/f?p=4750:*',
					'**/f?p=4800:*',
					'**/f?p=4850:*',
					'**/f?p=4900:*'
				]
			}
		}
	);

	return browsersync;
};
