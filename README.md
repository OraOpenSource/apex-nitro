<h1 align="center">
	<br>
	<img src="https://raw.githubusercontent.com/OraOpenSource/apex-nitro/master/docs/header.png" alt="APEX Nitro">
	<br>
	<br>
	<br>
</h1>

> Your essential APEX companion

[![npm](https://img.shields.io/npm/v/apex-nitro.svg)]() [![Build Status](https://travis-ci.org/OraOpenSource/apex-nitro.svg?branch=master)](https://travis-ci.org/OraOpenSource/apex-nitro) [![Dependency Status](https://david-dm.org/OraOpenSource/apex-nitro.svg)](https://david-dm.org/OraOpenSource/apex-nitro) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

APEX Nitro makes coding faster and easier by syncing static files more efficiently within an APEX application.

## Why APEX Nitro?
- Synchronizes your static files to APEX
- Synchronizes your devices together
- Merges your files into one
- Minifies your files for faster execution time
- Uploads your files to APEX
- Allows you to use Sass or LESS
- Handles JavaScript and CSS errors
- A lot more...

For a complete list of feature, [read the documentation](/docs/features.md).

## System Requirements
- [Node.js](https://nodejs.org) *>= v6*
* [SQLcl](http://www.oracle.com/technetwork/developer-tools/sqlcl/overview/index.html) *>= v17.2 (optional, used for the publish feature)*

## Install
```
npm install -g apex-nitro
```

*Note: you might encounter a few deprecation warnings during the installation. This is normal and we monitor these packages upon every release of APEX Nitro.*

[*Having problems on Windows?*](/docs/windows.md)
[*Having problems on Mac OS?*](/docs/macOS.md)
[*Having problems on Linux?*](/docs/linux.md)

## APEX Setup
[See documentation](/docs/setup.md) as you have to make one small modification to your APEX application.

## Project Configuration
Before you can use APEX Nitro, execute the command below to configure your project.

```
apex-nitro config <project>
```

## Run
```
apex-nitro launch <project>
```

## Usage
Create, edit or delete any file within the `src` folder:
```
|-/src/
    |-css
    |-js
    |-img
    |-lib
```

APEX Nitro will compile your files and synchronize them to your APEX application.

[Try our examples.](/examples/)

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
