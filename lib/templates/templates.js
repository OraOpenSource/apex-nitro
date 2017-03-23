'use strict';

module.exports = {
	asciiAFEB() {
		return String.raw`
       ___       _______  _______ .______
      /   \     |   ____||   ____||   _  \
     /  ^  \    |  |__   |  |__   |  |_)  |
    /  /_\  \   |   __|  |   __|  |   _  <
   /  _____  \  |  |     |  |____ |  |_)  |
  /__/     \__\ |__|     |_______||______/

        `;
	},

	banner() {
		return ['/*!',
			' * <%= pkg.name %> - <%= pkg.description %>',
			' * @author <%= pkg.author %>',
			' * @version v<%= pkg.version %>',
			' * @link <%= pkg.homepage %>',
			' * @license <%= pkg.license %>',
			' */',
			''
		];
	}
};
