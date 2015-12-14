# APEX Gulp Stack
This is a complete Gulp Stack for Oracle APEX front-end development.

## Project Sponsors
Thanks to [Insum Solutions](insum.ca) for sponsoring this project.

## Features
- [Browsersync](http://www.browsersync.io/)
- [Sass Parsing](http://sass-lang.com/)
- CSS and JS concatenation & minification
- [Autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer)
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
You might run into issues with `npm install` on Windows. That is because one of the packages (browsersync) requires C++ runtime libraries.

As instructed by [Browsersync's website](https://www.browsersync.io/docs/#windows-users):
> The way to resolve this is to install Visual Studio. At the time of this writing (Feb 2015) the compilation works fine with Visual Studio 2013 Update 4.
> After installation of Visual Studio npm should not throw errors any longer, but only issue warnings.

**As far as we've tested, these errors or warnings do not affect this project. You will still be able to run `npm start`.**

Feel free to install Visual Studio or not.

## Run
`npm start`

## How to use
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

## Changelog
See [changelog.md](changelog.md)

## Project Team
- [Vincent Morneau](https://github.com/vincentmorneau)
- [Martin Giffy D'Souza](https://github.com/martindsouza)
