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
    gulp.task('browsersync', function() {
        browsersync.init({
            port: config.browsersync.port,
            notify: config.browsersync.notify,
            proxy: {
                target: config.appURL,
                middleware: apexMiddleware,
                proxyReq: [apexProxyReq]
            },
            serveStatic: [config.distFolder],
            ui: {
                port: config.browsersync.uiPort,
                weinre: {
                    port: config.browsersync.weinrePort
                }
            },
            ghostMode: config.browsersync.ghostMode
        });
    });
}
