var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

module.exports = function(config, browsersync, port1, port2, port3) {
    var apexMiddleware = function (req, res, next) {
            res.setHeader('Set-Cookie', ['oos-apex-frontend-boost-app-images=//' + req.headers.host + '/']);
            next();
        },
        apexProxyReq = function(req, res, next) {
            req.setHeader('Origin', req.agent.protocol + '//' + req._headers.host);
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
