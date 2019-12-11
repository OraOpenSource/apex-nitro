# Changelog

## 5.0.0

BREAKING CHANGE: APEX Nitro v5 is NOT backwards compatible with v4.

- Introducing two new modes: Basic and Pro
- Much smaller size (50%) than APEX Nitro v4
- Pro mode is the most powerful APEX Nitro ever
  - Write your best JavaScript
  - Bring ES6, ES8 and more to APEX easily.
- Introducing APEX Nitro templates
  - Pick a Pro template and get going fast with predefined file structure
  - Write your own APEX Nitro Pro template
- New configuration system through `apex-nitro init`
  - Configuration is now stored at the project folder level, making it sharable
- `apex-nitro publish` is now `apex-nitro upload`
- Complete documentation rewrite

## 4.1.6

- Basic projects now benefits from browser synchronization automatically
- Allows JS code to use ES6
- Changes Autoprefixer settings to match UT
- Simplifies project configuration
- Bug fixes
- Documentation enhancements

## 4.1.5

- Removes sourcemaps from production files (.min files) for performance and security reasons
- System compatibility bug fixes (Windows, Mac, Linux) test suite

## 4.1.4

- Hot fix introduced by v4.1.3

## 4.1.3

- Allows to disable automatic JS reload / CSS injection [#258](https://github.com/OraOpenSource/apex-nitro/issues/258)
- Other dependency bug fixes

## 4.1.2

- Bug fixes
  - Autoprefixer
  - Webpack
- Documentation enhancements

## 4.1.1

- Performance enhancements on launch 
- Cleans CLI UI [#249](https://github.com/OraOpenSource/apex-nitro/issues/249)
- Config CLI now shows the URL [#248](https://github.com/OraOpenSource/apex-nitro/issues/248)
- Reenables Sass sourcemaps [#254](https://github.com/OraOpenSource/apex-nitro/issues/254)
- Validates if srcFolder = distFolder [#253](https://github.com/OraOpenSource/apex-nitro/issues/253)
- Bug fixes [#251](https://github.com/OraOpenSource/apex-nitro/issues/251) [#252](https://github.com/OraOpenSource/apex-nitro/issues/252)

## 4.1.0

- **Complete documentation rewrite**
- **Supports APEX Plugin development**
- **New notification system**
- Adds Java 9 support for the publish feature
- Simplifies the APEX Nitro config
- Better performance at load time
- Supports multiple subdirectory levels in the source folder
- Other bug fixes

Note: Sourcemaps are temporarily disabled for Sass. That is until the upstream bug is resolved on libsass here: https://github.com/sass/libsass/issues/2312

For more info check out https://github.com/OraOpenSource/apex-nitro/milestone/14

## 4.0.0

- **APEX Front-End Boost is rebranded to APEX Nitro**
- Simplifies APEX setup, **[please review yours](https://github.com/OraOpenSource/apex-nitro/blob/master/docs/setup.md)**
  - Build Option is no longer necessary
  - No longer requires a cookie
- New Configuration Tool `apex-nitro config <project>`
  - Now you can add project from the web interface
  - Password fields don't show in clear text anymore
  - Adds a basic mode, where only App URL and Source Folder is needed
  - Supports TypeScript as a JavaScript engine
  - Supports Webpack as a JavaScript engine, which allows to use ES6
- Adds many [examples](https://github.com/OraOpenSource/apex-nitro/tree/master/examples) 
- Adds a JavaScript Testing Framework for more robust releases
- Bug fixes

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
