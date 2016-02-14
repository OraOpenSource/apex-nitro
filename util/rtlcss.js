"use strict";

var gutil = require('gulp-util'),
    through = require('through2'),
    rtlcss = require('rtlcss');

module.exports = function (config) {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            return cb(new gutil.PluginError('apex-frontend-boost-rtlcss', 'Streaming not supported'));
        }

        if (file.extname == '.map') {
            return cb(null, file);
        }

        file.contents = new Buffer(rtlcss.process(file.contents.toString()));
        this.push(file);
        cb();
    });
};
