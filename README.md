# [![APEX Nitro](docs/header.png)](https://github.com/OraOpenSource/apex-nitro)

> Your essential APEX companion

[![npm](https://img.shields.io/npm/v/apex-nitro.svg)]() [![Build Status](https://travis-ci.org/OraOpenSource/apex-nitro.svg?branch=master)](https://travis-ci.org/OraOpenSource/apex-nitro) [![Dependency Status](https://david-dm.org/OraOpenSource/apex-nitro.svg)](https://david-dm.org/OraOpenSource/apex-nitro) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

APEX Nitro makes coding faster and easier by hosting and distributing static files  more efficiently within an APEX application.

## Why APEX Nitro?
- Synchronizes your APEX app files from your computer
- Synchronizes your devices together
- Merges your files into one
- Minifies your files for faster execution time
- Uploads your files to APEX
- Allows you to use Sass or LESS
- Handles JavaScript and CSS errors
- A lot more...

For a complete list of feature, [read the documentation](/docs/features.md).

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

## Setup
[See documentation](/docs/setup.md) to choose the most appropriate option for your project.

*Coming from APEX Front-End Boost? Make sure to review the setup, as some options have changed.*

## Project Configuration
```
apex-nitro config <project>
```

Before you can use APEX Nitro, execute the command above and follow the steps to configure your project.

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

APEX Nitro will compile your files and synchronize them to your APEX application.

[Try our examples.](/examples/readme.md)

[*Seeing self-signed SSL browser warnings?*](/docs/ssl-warning.md)

## Publish to APEX
When you are done developing, you may want to publish your files to the APEX Shared Components.

```
apex-nitro publish <project>
```

[See documentation](/docs/publish.md) to get SQLcl running on your environment.

## Changelog
[See changelog.](changelog.md)

## Project Sponsors
[Insum Solutions](http://insum.ca/)

## Team
- [Vincent Morneau](https://github.com/vincentmorneau)
- [Martin Giffy D'Souza](https://github.com/martindsouza)
