var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    isBuilderOpened = false;

const opn = require('opn');

module.exports = function(config, browsersync, port1, port2, port3) {
    var apexMiddleware = function (req, res, next) {
            res.setHeader('Set-Cookie', ['oos-apex-frontend-boost-app-images=//' + req.headers.host + '/']);
            next();
        },
        apexProxyReq = function(req, res, next) {
            openAPEXBuilder(req.agent.protocol, res.headers.host, req.path);
            req.setHeader('Origin', req.agent.protocol + '//' + req._headers.host);
        };

    var openAPEXBuilder = function (protocol, host, paramString) {
        // should only open the builder once
        if (!isBuilderOpened && config.apex.openBuilder) {
            opn(protocol + '//' + host + paramString.substring(0, paramString.indexOf("f?p")) + "f?p=4000"); // app 4000 is the APEX builder
            isBuilderOpened = true;
        }
    };

    // launch browsersync server
    gulp.task('browsersync', function() {
        browsersync.init({
            port: port1,
            notify: config.browsersync.notify,
            proxy: {
                target: config.appURL,
                middleware: apexMiddleware,
                proxyReq: [apexProxyReq]
            },
            serveStatic: [config.distFolder],
            ui: {
                port: port2,
                weinre: {
                    port: port3
                }
            },
            ghostMode: config.browsersync.ghostMode
        });
    });
}
