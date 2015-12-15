# APEX Gulp Stack
This is a complete Gulp Stack for Oracle APEX front-end development.

## Project Sponsors
Thanks to [Insum Solutions](insum.ca) for sponsoring this project.

## Features
- [Browsersync](http://www.browsersync.io/)
- [Sass Parsing](http://sass-lang.com/)
- CSS and JS concatenation & minification
- [Autoprefixer](https://github.com/postcss/autoprefixer)
- Sourcemaps
- Filesize indicator
- Error handling

TODO @martindsouza add gif of project in action

## Install
```bash
git clone https://github.com/OraOpenSource/apex-gulp-stack.git
cd apex-gulp-stack
npm install
```

### Installing on Windows?
See [dedicated wiki page](https://github.com/OraOpenSource/apex-gulp-stack/wiki/Installing-on-Windows).

## Configuration
You will want to configure for your project needs. See [dedicated wiki page](https://github.com/OraOpenSource/apex-gulp-stack/wiki/Config.json).

## Run
`npm start`

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

### Self-Signed SSL Browser Warning
See [dedicated wiki page](https://github.com/OraOpenSource/apex-gulp-stack/wiki/Self-Signed-SSL-Browser-Warning).

## Changelog
See [changelog](changelog.md).

## Project Team
- [Vincent Morneau](https://github.com/vincentmorneau)
- [Martin Giffy D'Souza](https://github.com/martindsouza)
