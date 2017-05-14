'use strict';

const gulp = require('gulp');
const opn = require('opn');

let isBuilderOpened = false;

module.exports = function (config, browsersync, ports) {
	const openAPEXBuilder = function (protocol, host, paramString) {
		// Should only open the builder once
		if (!isBuilderOpened && config.apex.openBuilder) {
			opn(protocol + '//' + host + paramString.substring(0, paramString.indexOf('f?p')) + 'f?p=4000'); // App 4000 is the APEX builder
			isBuilderOpened = true;
		}
	};

	const apexMiddleware = function (req, res, next) {
		res.setHeader('Set-Cookie', ['oos-apex-nitro=//' + req.headers.host + '/']);
		next();
	};
	const apexProxyReq = function (req, res) {
		openAPEXBuilder(req.agent.protocol, res.headers.host, req.path);
		req.setHeader('Origin', req.agent.protocol + '//' + req._headers.host);
	};

	// Launch browsersync server
	gulp.task('browsersync', () => {
		browsersync.init({
			port: ports[0],
			notify: config.browsersync.notify,
			proxy: {
				target: config.appURL,
				middleware: apexMiddleware,
				proxyReq: [apexProxyReq]
			},
			serveStatic: [config.distFolder || config.srcFolder],
			ui: {
				port: ports[1],
				weinre: {
					port: ports[2]
				}
			},
			ghostMode: config.browsersync.ghostMode,
			snippetOptions: {
				// Ignores all APEX builder apps
				blacklist: [
					'**/f?p=4000*',
					'**/f?p=4050*',
					'**/f?p=4155*',
					'**/f?p=4300*',
					'**/f?p=4350*',
					'**/f?p=4400*',
					'**/f?p=4411*',
					'**/f?p=4500*',
					'**/f?p=4550*',
					'**/f?p=4700*',
					'**/f?p=4750*',
					'**/f?p=4800*',
					'**/f?p=4850*',
					'**/f?p=4900*'
				]
			}
		});
	});
};
