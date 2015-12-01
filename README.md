# APEX Gulp Stack
This is a complete Gulp Stack for Oracle APEX front-end development.

## Project Sponsors

Thanks to [Insum Solutions](insum.ca) for sponsoring this project.

## Features
- [Browsersync](http://www.browsersync.io/)
- SCSS Parsing
- CSS concatenation & minification
- JS concatenation & minification
- [Autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer)
- Sourcemaps
- Minified and un-minified JS & CSS output
- Filesize indicator
- Error handling

TODO @martindsouza add gif of project in action

# Install
```bash
git clone https://github.com/OraOpenSource/apex-gulp-stack.git
cd apex-gulp-stack
npm install
```

# Run
`npm start`

# How to use
From the root folder, You can create, edit or delete any files in:
```
|-/src
	|-scss
    |-img
    |-js
    |-lib
```

The Gulp magic will happen and compile your files to this folder structure:

```
|-/dist
    |-css
    |-img
    |-js
    |-lib
```

Note: Everything in the `/src/` folder of this repo is to be replaced by your files.

# Changelog
See [changelog.md](changelog.md)

### That's all! Enjoy an easy Sass parsing.

## Project Team
- [Vincent Morneau](https://github.com/vincentmorneau)
- [Martin Giffy D'Souza](https://github.com/martindsouza)
