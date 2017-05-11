# APEX Nitro

[![npm](https://img.shields.io/npm/v/apex-nitro.svg)]() [![Build Status](https://travis-ci.org/OraOpenSource/apex-nitro.svg?branch=master)](https://travis-ci.org/OraOpenSource/apex-nitro) [![Dependency Status](https://david-dm.org/OraOpenSource/apex-nitro.svg)](https://david-dm.org/OraOpenSource/apex-nitro) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

## What is it
APEX Nitro makes coding faster and easier by hosting and distributing static files (`js`, `css`, `images`, etc.) more efficiently within an APEX application.

![demo](/docs/demo.gif)

#### What it does
- Minifies `js` and `css`.
- Generates  `js` and `css` sourcemaps.
- Adds `css` vendor prefixes.
- Concatenates `js` and `css`. *(optional)*
- Parses `scss` and `less` to `css`. *(optional)*
- Generates APEX Theme Roller configuration. *(optional)*
- Adds a standardized header comment block to `js` and `css` files. *(optional)*

#### How it helps you
- Cut down on front-end development time.
- Enhance your application performance due to smaller file sizes.
- Keep coding in your favorite code editor, without having to constantly upload anything to APEX or a web server.
- Stop manual refresh of your browser to get `js` and `css` modification.
- Stop affecting other developers. **Any development done within APEX Nitro affects you and only you**.
- Be notified of `js` and `css` errors as you save.

#### Other benefits
- Makes responsive development easier by synchronizing multiple devices together.
- All devices (desktop, tablet, mobile, etc.) will imitate each others actions (scrolling, clicking, typing).
- Eliminates the need for refreshing the browser. As soon as you save your code in the text editor, you get automatic code injection / reloading in the browser.

## Project Sponsors
Thanks to [Insum Solutions](http://insum.ca/) for sponsoring this project.

## System Requirements
- [Node.js](https://nodejs.org)
* [SQLcl](http://www.oracle.com/technetwork/developer-tools/sqlcl/overview/index.html) *(optional, used for the publish feature)*

## Install
```
npm install -g apex-nitro
```

[*Having problems on Windows?*](/docs/windows.md)
[*Having problems on Mac OS?*](/docs/macOS.md)
[*Having problems on Linux?*](/docs/linux.md)

## APEX Setup
[See documentation](/docs/apex-setup.md) to choose the most appropriate option for your project.

## Project Configuration
```
apex-nitro config <project>
```

This will open a documented web page with the appropriate configuration options.

## Run
```
apex-nitro launch <project>
```

## Usage
Create, edit or delete any file within the `src` folder:
```
|-/src/
	|-scss
	|-less
    |-css
    |-img
    |-js
    |-lib
```

APEX Nitro will compile your files and push it to your APEX application.

[See examples.](/examples/readme.md)

[*Seeing self-signed SSL browser warnings?*](/docs/ssl-warning.md)

## Publish to APEX
When you are done developing, you may want to publish your files to the APEX Shared Components.

```
apex-nitro publish <project>
```

[See documentation](/docs/publish.md) to get SQLcl running on your environment.

## Changelog
[See changelog.](changelog.md)

## Team
- [Vincent Morneau](https://github.com/vincentmorneau)
- [Martin Giffy D'Souza](https://github.com/martindsouza)
