var fs = require('fs');
var configFile = 'config.json';
var config = {
    "yourProject1Name": {
        "appURL": "yourApplicationURL",
        "srcFolder": "yourSrcFolder",
        "distFolder": "yourDistFolder"
    },
    "yourProject2Name": {
        "appURL": "yourApplicationURL",
        "srcFolder": "yourSrcFolder",
        "distFolder": "yourDistFolder"
    }
};

fs.access(configFile, fs.F_OK, function (err) {
    err && fs.writeFile(configFile, JSON.stringify(config, null, 4), { flag: 'wx' }, function (err) {
        if (err) return console.log(err);
    });
});
