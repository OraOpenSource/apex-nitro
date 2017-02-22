var configurator = require("json-local-configurator"),
    schema = require('../templates/schema');

// AFEB - config
module.exports = function(args) {
    let project = args[0];

    configurator.init({
        module: "afeb",
        project: project,
        jsonSchema: schema
    });
}
