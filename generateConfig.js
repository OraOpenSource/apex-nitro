var fs = require('fs');

var config = {
    "yourProject1Name": {
        "appURL": "yourApplicationURL"
    },
    "yourProject2Name": {
        "appURL": "yourApplicationURL"
    }
};

fs.writeFile('config.json', JSON.stringify(config, null, 4), { flag: 'wx' }, function (err) {
    if (err) return console.log(err);
});
