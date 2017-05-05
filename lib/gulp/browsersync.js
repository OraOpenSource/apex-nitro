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
		res.setHeader('Set-Cookie', ['oos-apex-frontend-boost-app-images=//' + req.headers.host + '/']);
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
			ghostMode: config.browsersync.ghostMode
		});
	});
};
