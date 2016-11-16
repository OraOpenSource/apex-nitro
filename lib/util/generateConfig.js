var fs = require('fs');
var path = require('path');

fs.open(path.resolve(__dirname, '../../config.json'), 'wx', (err, fd) => {
    if (err) {
        if (err.code === "EEXIST") {
            return;
        } else {
            throw err;
        }
    }

    fs.writeFile(path.resolve(__dirname, '../../config.json'), JSON.stringify({}), (err) => {
        if (err) throw err;
    });
});
