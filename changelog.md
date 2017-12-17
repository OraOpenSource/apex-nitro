# Changelog

## 4.1.0
- **Completely new documentation**
- **Support APEX Plugin development**
- **New notification system**
- Adds Java 9 support for the publish feature
- Simplifies the APEX Nitro config structure
- Better performance at load time

## 4.0.0
- Release candidate for the previous betas.

## 4.0.0-beta5

- Simplifies APEX Setup: Build Option is no longer necessary
- Adds more unit tests for a stronger build
- Bug fixes

## 4.0.0-beta4

- Simplifies APEX Setup, **[please review yours](https://github.com/OraOpenSource/apex-nitro/blob/master/docs/setup.md)**
	- No longer requires a cookie
	- [Fixes a bug](https://github.com/OraOpenSource/apex-nitro/issues/198) when server was localhost, thanks to @fuzziebrain
- **If you were using the publish feature, please review your project configuration by doing `apex-nitro config <your project>`**
- Bug fixes on the publish feature

## 4.0.0-beta3

- Rolling back one dependency because it broke the minification process
	- gulp-uglify from 3.0.x to 2.1.x

## 4.0.0-beta2

- APEX Nitro now compiles the files before publishing them to the Shared Components
- Simplifies APEX setup
- Configuration Tool
	- Now you can add project from the web interface
	- Password fields don't show in clear text anymore
- Supports TypeScript as a JavaScript engine
- [Other bug fixes](https://github.com/OraOpenSource/apex-nitro/milestone/13?closed=1)


## 4.0.0-beta1

- APEX Front-End Boost is rebranded to APEX Nitro
- Adds a basic mode, where only App URL and Source Folder is needed
- Adds `webpack` option, which allows to use ES6
- Adds 7 examples that can be imported by users to try
- Adds a JavaScript unit test framework, ensuring more consistent releases
- APEX Builder doesn't reload on JS changes anymore (#196)
- Fixes a Theme Roller bug (#191)

## 3.1.3

- Minor: changes `publish` parameter name

## 3.1.2

- `afeb publish` can now upload to:

  - Application Static Files
  - Workspace Static Files
  - Theme Files

- fixes a Theme Roller issue (#190)

## 3.1.1

- Refactoring

## 3.1.0

- Separated npm modules (publish feature, config feature)

## 3.0.0

- **Auto Upload to APEX** (`afeb publish <project>`)
- Adds an option to launch the APEX Builder alongside the application when doing `afeb launch <project>`
- Removed restriction on folder names. Folders can be anything now.
- Performance enhancements
- Bug fixes

## 2.2.4

- Dropped image optimization feature. [See why.](https://github.com/OraOpenSource/apex-nitro/issues/164)

## 2.2.3

- Bug fixes

## 2.2.2

- Bug fixes

## 2.2.1

- Bug fixes

## 2.2.0

- Added `npm` back
- New installation method
- New web interface to configure projects
- New CLI interface with custom commands

  - `afeb config <project>`
  - `afeb launch <project>`
  - `afeb help <command>`
  - `afeb -v`

- Dropped RTLCSS

## 2.1.3

- **APEX Front-End Boost is now usable on ORDS 3.0.3 and up.**
- Adds an option `config.browsersync.ghostMode` to enable/disable the mirroring of clicks, scrolls and typing across devices.
- Reloads the browser for any changes made inside `img` and `lib` folders.
- Notifies you when APEX Front-End Boost has a new version

## 2.1.2

- Removed `npm` as an install option for simplicity.

## 2.1.1

- Greatly enhanced the project error handling to provide more details and hints to the user.
- The `/src/` folder is now automatically created if it doesn't exist yet.
- Added `.sass` file support in addition to the existing `.scss` support.
- Docs: Added a documentation notice on ORDS issues.
- Docs: Added an advice to use an elevated command line (run as admin).
- Docs: Changed some of the project terminology.
- Docs: Provided two different installation options (Git and npm).
- Docs: Enhanced the documentation for `config.json`
- Created project issue template for better support going forward.

## 2.1.0

- Project is now available on npm
- Fixed a bug preventing from doing POST on Chrome
- Concatenation is now disabled by default. You will have to enable it in your `config.json` file if you want your project to use `js` or `css` concatenation.

  - `javascriptConcat` is now `jsConcat`

- Added ports configuration over the `browsersync` feature in `config.json` (per project)
- Simplified Windows shortcut
- Added system requirements
- Enhanced docs
- More.

## 2.0.0

- Complete project overhaul. Read documentation for a complete list of features.

## 1.4.0

- Updated dependencies
- Changed terminology

  - `client` to `src`
  - `build` to `dist`

- Removed image minification package

  - was not generic enough for this project

- Removed assets intermediate folder

## 1.3.0

- Updated dependencies

## 1.2.0

- Updated dependencies

## 1.1.0

- Updated dependencies

## 1.0.0

- Initial Release
