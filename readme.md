# APEX Nitro

<h1 align="center">
  <br />
  <img src="https://raw.githubusercontent.com/OraOpenSource/apex-nitro/master/docs/img/apex-nitro-logo.png" alt="APEX Nitro" width="500">
  <br />
  <br />
</h1>

[![npm](https://img.shields.io/npm/v/apex-nitro.svg)](https://www.npmjs.com/package/apex-nitro) [![Build Status](https://travis-ci.org/OraOpenSource/apex-nitro.svg?branch=master)](https://travis-ci.org/OraOpenSource/apex-nitro) [![Dependency Status](https://david-dm.org/OraOpenSource/apex-nitro.svg)](https://david-dm.org/OraOpenSource/apex-nitro) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

> Front-end development in Oracle APEX at its best.

APEX Nitro is a build tool for APEX Front-end development. It watches for file changes (JavaScript, CSS, other) on your machine, compiles them into a better format and synchronizes them to your APEX app in real time.

## What APEX Nitro does

- Synchronizes code in real time to your APEX app
- Allows to write next generation JavaScript
- Serves minified code to APEX for better performance
- Ensures code style and standards are used
- A lot more...

Read the [complete documentation](/docs/features.md) for more info on all features.

## Requirements

- [Node.js](https://nodejs.org)
- [SQLcl](http://www.oracle.com/technetwork/developer-tools/sqlcl/overview/index.html) _(optional, used to upload your files to APEX Shared Components)_

## Quickstart

Follow the next few sections to get started quicky with APEX Nitro.

_To get the full APEX Nitro experience, [go to the full documentation](/docs/)._

### Install

```bash
npm install -g apex-nitro
```

### Initialize your project

Answer a few simple questions about your project:

```bash
apex-nitro init
```

![command-init](/docs/img/command-init.png)

Read more on [initializing your APEX Nitro project](/docs/init.md)

### Setup your APEX app

To enable APEX Nitro in your app, you must make a small tweak in your application. In the APEX builder, go to `Shared Components > Application Processes` and create a new application process with the following attributes:

| Attribute         | Value                                                                   |
| ----------------- | ----------------------------------------------------------------------- |
| Name              | `APEX Nitro`                                                            |
| Sequence          | `-999`                                                                  |
| Process Point     | `On Load: Before Header (page template header)`                         |
| Condition         | `owa_util.get_cgi_env('APEX-Nitro') is not null`                        |
| Source (`PL/SQL`) | `apex_application.g_flow_images := owa_util.get_cgi_env('APEX-Nitro');` |

![setup-application-process](/docs/img/setup-application-process.png)

Now your files have to be referenced in APEX. A recommended location is in the User Interface Attributes:

![setup-reference-application](/docs/img/setup-reference-application.png)

```bash
#APP_IMAGES#myproject.js
#APP_IMAGES#myproject.css
```

Read the documentation for more information about the [APEX app setup](/docs/setup.md).

### Launch your app

Enable real time coding in your app by executing a simple command:

```bash
apex-nitro launch
```

![command-launch](/docs/img/command-launch.png)

Then open up your favorite code editor where your JavaScript, CSS files are. Any change you make to your files will be synchronized to your APEX app in real time.

Tip: use `apex-nitro launch --nomin` to skip the building of production files that includes *.min.js and *.min.css. This will accelerate the build time while you are developing.

### File structure

Create, edit or delete any file in your local source folder. Example:

```bash
|-/src/
  |-myproject.css
  |-myproject.js
```

APEX Nitro will synchronize the content of that folder to your APEX app.

Read more about [APEX Nitro file structure patterns](/docs/structure.md).

### Uploading your files to APEX Shared Components

```bash
apex-nitro upload
```

![command-upload](/docs/img/command-upload.png)

Note: Uploading your files to APEX is optional as you might want to put the files elsewhere than the Shared Components.

[Read more](/docs/upload.md) about uploading your files.

## Troubleshoot

[Read more about common issues.](/docs/troubleshooting.md)

## Changelog

[See changelog.](changelog.md)

## Project Sponsors

[Insum Solutions](https://insum.ca/)

## Team

- [Vincent Morneau](https://github.com/vincentmorneau)
- [Daniel Frech](https://github.com/dfrechdev)
- [Martin Giffy D'Souza](https://github.com/martindsouza)
