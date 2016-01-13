var fs = require('fs');

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

fs.writeFile('config.json', JSON.stringify(config, null, 4), { flag: 'wx' }, function (err) {
    if (err) return console.log(err);
});
