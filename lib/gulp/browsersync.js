var plugins = require('gulp-load-plugins')();

module.exports = function(gulp, config, browsersync) {
    var apexMiddleware = function (req, res, next) {
            res.setHeader('Set-Cookie', ['oos-apex-frontend-boost-app-images=//' + req.headers.host + '/']);
            next();
        },
        apexProxyReq = function(req, res, next) {
            req.setHeader('Origin', req.agent.protocol + '//' + req._headers.host);
        };

    // launch browsersync server
    portscanner.findAPortNotInUse(4000, 49999, '127.0.0.1', function(error, port1) {
        portscanner.findAPortNotInUse(port1 + 1, 49999, '127.0.0.1', function(error, port2) {
            portscanner.findAPortNotInUse(port2 + 1, 49999, '127.0.0.1', function(error, port3) {
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
            });
        });
    });
}
