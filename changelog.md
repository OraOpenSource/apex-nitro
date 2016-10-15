# Changelog
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
