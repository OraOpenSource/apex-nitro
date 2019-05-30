const path = require('path');
const fs = require('fs-extra');
const del = require('del');

module.exports = function (config) {
	// Deletes the dist directory before recreating it
	del([path.resolve(config.distFolder)], {
		force: true
	}).then(() => {
		fs.ensureDirSync(path.resolve(config.distFolder));
	});
};
