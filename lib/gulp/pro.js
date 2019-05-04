const gulp = require("gulp");
const options = require("./options");

module.exports = function(config, browsersync) {
	// Pro task
	gulp.task("pro", () => {
		// To-Do: forward here!!!
		console.log("==> forward to template build");
	});

	// JavaScript & Browsersync
	gulp.task(
		"pro-watch",
		gulp.series("pro", done => {
			if (taskSuccess) {
				if (config.browsersync.realTime) {
					browsersync.reload();

					if (config.browsersync.notify) {
						notifier.notify(options.notifySuccessPro());
					}
				}
			} else {
				notifier.notify(options.notifyError());
			}

			done();
		})
	);
};
