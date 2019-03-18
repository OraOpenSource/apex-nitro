module.exports = {
	banner() {
		return ['/*!',
			' * <%= pkg.name %> - <%= pkg.description %>',
			' * @author <%= pkg.author %>',
			' * @version v<%= pkg.version %>',
			' * @link <%= pkg.link %>',
			' * @license <%= pkg.license %>',
			' */',
			''];
	},

	bannerES6(pkg) {
		return `${pkg.name} - ${pkg.description}
@author ${pkg.author}
@version v${pkg.version}
@link ${pkg.link}
@license ${pkg.license}`;
	}
};
