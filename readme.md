# APEX Nitro

<h1 align="center">
  <br />
  <img src="https://raw.githubusercontent.com/OraOpenSource/apex-nitro/master/docs/img/apex-nitro-logo.png" alt="APEX Nitro" width="500">
  <br />
  <br />
</h1>

[![npm](https://img.shields.io/npm/v/apex-nitro.svg)](https://www.npmjs.com/package/apex-nitro) [![Build Status](https://travis-ci.org/OraOpenSource/apex-nitro.svg?branch=master)](https://travis-ci.org/OraOpenSource/apex-nitro) [![Dependency Status](https://david-dm.org/OraOpenSource/apex-nitro.svg)](https://david-dm.org/OraOpenSource/apex-nitro) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

> Front-end development in Oracle APEX at its best.

APEX Nitro is a build tool for APEX front-end development. It watches for file changes (JavaScript, CSS, other) on your system, compiles them into a better format and synchronizes them to your APEX app in real time.

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

### Write your code

Create, edit or delete any file in your source folder. Example:

```bash
|-/src/
  |-myproject.css
  |-myproject.js
```

Read more about [APEX Nitro code patterns](/docs/code.md).

### Connect your APEX app

To enable APEX Nitro in your app, you must make a small tweak in your application. Go to `Shared Components > Application Processes` and create a new application process with the following attributes:

| Attribute         | Value                                                                   |
| ----------------- | ----------------------------------------------------------------------- |
| Name              | `APEX Nitro`                                                            |
| Sequence          | `-999`                                                                  |
| Process Point     | `On Load: Before Header (page template header)`                         |
| Condition         | `owa_util.get_cgi_env('APEX-Nitro') is not null`                        |
| Source (`PL/SQL`) | `apex_application.g_flow_images := owa_util.get_cgi_env('APEX-Nitro');` |

![setup-application-process](/docs/img/setup-application-process.png)

Read the documentation for more information about how to [connect your APEX app](/docs/connect.md).

### Reference your files

Your APEX application must references the APEX Nitro files. A recommended location is in the User Interface Attributes:

![setup-reference-application](/docs/img/setup-reference-application.png)

```bash
#APP_IMAGES#myproject#MIN#.js
#APP_IMAGES#myproject#MIN#.css
```

### Build your files

Compiles all local files into a single build more efficient for APEX consumption.

```bash
apex-nitro build
```

![command-build](/docs/img/command-build.png)

### Launch your app

Enable real time coding in your app:

```bash
apex-nitro launch
```

![command-launch](/docs/img/command-launch.png)

This includes the `apex-nitro build` step.

Open up your favorite code editor. Any change you make to your files will be synchronized to your APEX app in real time.

### Uploading your files to APEX Shared Components

```bash
apex-nitro upload
```

![command-upload](/docs/img/command-upload.png)

[Read more](/docs/upload.md) about uploading your files.

## Troubleshoot

[Read more about common issues.](/docs/troubleshooting.md)

## Moving from APEX Nitro v4 to v5

[Are your an APEX Nitro v4 user? Read about moving to v5.](/docs/migration.md)

## Changelog

[See changelog.](changelog.md)

## Project Sponsors

[Insum Solutions](https://insum.ca/)

## Team

- [Vincent Morneau](https://github.com/vincentmorneau)
- [Daniel Frech](https://github.com/dfrechdev)
- [Martin Giffy D'Souza](https://github.com/martindsouza)
