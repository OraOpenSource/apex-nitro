# apex-gulp-stack
This is a complete Gulp Stack for APEX front-end development.

#Features
- Browsersync
- SCSS Parsing
- CSS concatenation & minification
- JS concatenation & minification
- Autoprefixer
- Sourcemaps
- Minified and un-minified JS & CSS output
- Filesize indicator
- Error handling

#Changelog
##2.0.0
This Release.. TODO
- Added Browsersync support
- Browsersync and Sass are now optional
- Added a config.json file for user configuration
- Lots of code refactoring

##1.4.0
- Updated dependencies
- Changed terminology
    - `client` to `src`
    - `build` to `dist`
- Removed image minification package
    - was not generic enough for this project
- Removed assets intermediate folder

##1.3.0
- Updated to gulp-concat 		2.6.x
- Updated to gulp-size          2.0.x
- Updated to gulp-minify-css    1.2.x
- Updated to gulp-imagemin      2.3.x
- Updated to gulp-load-plugins	1.0.x-rc.1

##1.2.0
- Updated to gulp-uglify 1.2.x
- Updated to gulp-rename 1.2.x
- Updated to gulp-plumber 1.0.x
- Updated to gulp-load-plugins 0.10.x
- Updated to gulp-del 1.2.x
- Updated to gulp-util 3.0.x
- Updated to gulp-jshint 1.11.x
- Updated to gulp-autoprefixer 2.3.x
- Updated to gulp-minify-css 1.1.x
- Updated to run-sequence 1.1.x
- Updated to gulp 3.9.x
- Updated to jshint-stylish 2.0.x
- Updated to gulp-sourcemaps 1.5.x

##1.1.0
- Updated to gulp-sass 2.0.x
	+ Which updates node-sass to 3.0.0
	+ Fix Source maps now work as expected with Autoprefixer

##1.0.0
- Initial Release

#Install
```npm install```

#Run
```npm start```

#How to use
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

Note: Everything in the ```/src/``` folder of this repo is to be replaced by your files.

###That's all! Enjoy an easy Sass parsing.
