# APEX Front-End Boost

[![Build Status](https://travis-ci.org/OraOpenSource/apex-frontend-boost.svg?branch=master)](https://travis-ci.org/OraOpenSource/apex-frontend-boost)
[![Dependency Status](https://david-dm.org/OraOpenSource/apex-frontend-boost.svg)](https://david-dm.org/OraOpenSource/apex-frontend-boost)

- [What APEX Front-End Boost is](#what-apex-front-end-boost-is)
	- [What it does](#what-apex-front-end-boost-does)
	- [How it helps you](#how-apex-front-end-boost-helps-you)
	- [Other benefits](#other-benefits)
- [Project Sponsors](#project-sponsors)
- [System Requirements](#system-requirements)
- [Install](#install)
- [APEX Setup](#apex-setup)
- [Project Configuration](#configuration)
- [Run](#run)
- [Usage](#usage)
- [Features](#features)
- [Changelog](#changelog)
- [Project Team](#project-team)

## What APEX Front-End Boost is
APEX Front-End Boost is a personal local web server that hosts and distributes your files to your APEX application.

APEX Front-End Boost makes coding faster and easier. This productivity tool helps you work with static files (`js`, `css`, `images`, etc.) more efficiently within an APEX application.

![demo](/docs/demo-main.gif)

#### What it does
- Minifies `js` and `css`.
- Generates  `js` and `css` sourcemaps.
- Adds `css` vendor prefixes.
- Concatenates `js` and `css`. *(optional)*
- Parses `scss` and `less` to `css`. *(optional)*
- Generates APEX Theme Roller configuration. *(optional)*
- Adds a standardized header comment block to `js` and `css` files. *(optional)*
- Minifies images seamlessly *(optional)*

#### How it helps you
- Cut down on front-end development time.
- Enhance your application performance due to smaller file sizes.
- Keep coding in your favorite code editor, without having to constantly upload anything to APEX or a web server.
- Stop manual refresh of your browser to get `js` and `css` modification.
- Stop affecting other developers. **Any development done within APEX Front-End Boost affects you and only you**.
- Be notified of `js` and `css` errors as you save.

#### Other benefits
- Makes responsive development easier by synchronizing multiple devices together.
- All devices (desktop, tablet, mobile, etc.) will imitate each others actions (scrolling, clicking, typing).
- Eliminates the need for refreshing the browser. As soon as you save your code in the text editor, you get automatic code injection / reloading in the browser.

## Project Sponsors
Thanks to [Insum Solutions](http://insum.ca/) for sponsoring this project.

## System Requirements
- [Node.js](https://nodejs.org)

## Install
```
npm install -g apex-frontend-boost
```

*Having problems installing on Windows? [See documentation](/docs/windows.md).*  
*Having problems installing on Linux? [See documentation](/docs/linux.md).*

## APEX Setup
[See documentation](/docs/apex-setup.md) to choose the most appropriate option for your project.

## Project Configuration
```
afeb config <project>
```
[See documentation](/docs/config.md) to configure APEX Front-End Boost for your project.

## Run
```
afeb launch <project>
```

## Usage
From the `src` folder you can create, edit or delete any files in:
```
|-/src/
	|-scss
	|-less
    |-css
    |-img
    |-js
    |-lib
```

APEX Front-End Boost will automatically compile your files and push it to your application.

*Seeing self-signed SSL browser warnings? [See documentation](/docs/ssl-warning.md).*

## Features
- [Browsersync](http://www.browsersync.io/)
- [Sass](http://sass-lang.com/)
- [Less](http://lesscss.org/)
- [Autoprefixer](https://github.com/postcss/autoprefixer)
- [JSHint](http://jshint.com/)
- [UglifyJS](https://github.com/terinjokes/gulp-uglify)
- [Sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
- [Header](https://github.com/tracker1/gulp-header)
- [imagemin](https://github.com/sindresorhus/gulp-imagemin)
- More

[See examples](/docs/examples.md).

## Changelog
[See changelog](changelog.md).

## Project Team
- [Vincent Morneau](https://github.com/vincentmorneau)
- [Martin Giffy D'Souza](https://github.com/martindsouza)
