# APEX Front-End Boost
This productivity tool helps you work with web files (`js`, `css`, `images`, etc.) more efficiently within an APEX application.

TODO Martin: include animated gif (#19) of this project in action. VMORNEAU: I think this should go here (at the top).

**What APEX Front-End Boost does:**
- Creates a local web server to host your web files (`js`, `css`, `images`, etc.)
- Watches any changes to these files and injects the new content into your browser.
- Minifies `css` and `js` files and provides a `.min` version of your code.
- Concatenates `css` and `js` files and provides a single file version of your code. *(optional)*
- Parses Sass to `css` *(optional)*
- Creates a Sourcemaps file of your `js`, `scss` or `css` code, so you can easily trace back the final concatenated and minified file to your original source file. Example:
![](docs/sourcemaps.png)
- Adds vendor prefixes to your `css` code. Example:  
```css
a { display: flex }
```
Becomes:  
```css
a {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex
}
```

**What APEX Front-End Boost allows you:**
- Cutting down on front-end development time.
- Enhance your application performance with smaller file sizes.
- Keep coding in your favorite code editor, without having to constantly upload anything to APEX or a web server.
- Stop manually refresh your browser for `js` or `css` modification.
- Stop worrying about affecting other developers. Any development done within APEX Front-End Boost affects you and only you.
- Be notified of `js` and `css` errors as you save.

**Read the docs ([application-item](docs/application-item.md), [application-process](docs/application-process.md) and [build option](docs/build-option.md)) on how to setup APEX to support this functionality.**

## Project Sponsors
Thanks to [Insum Solutions](http://insum.ca/) for sponsoring this project.

## Install
```bash
git clone https://github.com/OraOpenSource/apex-frontend-boost.git
cd apex-frontend-boost
npm install
```

#### Installing on Windows?
[See documentation](/docs/windows.md).

## Configuration
You will want to configure for your project. [See documentation](/docs/config.json.md).

## Setup
#### Build Option
One build option to add. [See documentation](/docs/build-option.md).

#### Application Items
2 application items to add. [See documentation](/docs/application-item.md).

#### Application Processes
2 application processes to add. [See documentation](/docs/application-process.md).

## Run
`npm start -- --project=yourProjectName`

## Usage
From the `src` folder you can create, edit or delete any files in:
```
|-/src/
	|-scss
    |-css
    |-img
    |-js
    |-lib
```

Gulp will automatically compile your files to this folder structure:
```
|-/dist/
    |-css
    |-img
    |-js
    |-lib
```

#### Using with multiple devices
[See documentation](/docs/multiple-devices.md).

#### Self-Signed SSL Browser Warning
[See documentation](/docs/ssl-warning.md).

## Features
- [Browsersync](http://www.browsersync.io/)
- [Sass Parsing](http://sass-lang.com/)
- [Autoprefixer](https://github.com/postcss/autoprefixer)
- [JSHint](http://jshint.com/)
- [UglifyJS](https://github.com/terinjokes/gulp-uglify)
- [Sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
- More...

## Changelog
[See changelog](changelog.md).

## Project Team
- [Vincent Morneau](https://github.com/vincentmorneau)
- [Martin Giffy D'Souza](https://github.com/martindsouza)
