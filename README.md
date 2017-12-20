<h1 align="center">
	<br>
	<img src="https://raw.githubusercontent.com/OraOpenSource/apex-nitro/master/docs/img/apex-nitro-logo.png" alt="APEX Nitro" width="600">
	<br>
	<br>
</h1>

> Your essential APEX companion

[![npm](https://img.shields.io/npm/v/apex-nitro.svg)](https://www.npmjs.com/package/apex-nitro) [![Build Status](https://travis-ci.org/OraOpenSource/apex-nitro.svg?branch=master)](https://travis-ci.org/OraOpenSource/apex-nitro) [![Dependency Status](https://david-dm.org/OraOpenSource/apex-nitro.svg)](https://david-dm.org/OraOpenSource/apex-nitro) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

## What APEX Nitro is
APEX Nitro is a command line tool that runs in the background while you develop an APEX Application.

While running, it watches for local static file (e.g. `js`, `css`) modifications inside of a given directory, compiles them into a better format and sends them back to your APEX application seamlessly. It makes front-end coding faster by syncing these local files to your APEX application in real-time.

APEX Nitro also makes front-end development easier by establishing clear guidelines and by enforcing good programming practices. It starts by streamlining CSS and JavaScript and by entirely eliminating the (bad) practice of inline coding. Your APEX application benefits from an efficient 100% file-based approach.

### What APEX Nitro does  
- Browser Synchronization
- File Minification
- File Concatenation
- Source Mapping
- Error Handling
- CSS Preprocessing
- CSS Auto-Prefixer
- Theme Roller Customization

For more info on the features, [read the documentation](/docs/features.md).

### Benefits
- Reduce development time
- Reduce mundane tasks
- Increase maintainability
- Better modularization
- Performance boost
- Enhances teamwork
- Makes responsive development easier

For more info on the benefits, [read the documentation](/docs/benefits.md).

## Quickstart
This following sections show the easiest way to get started with APEX Nitro.

[Go to the full documentation](/docs/) to read more about using APEX Nitro.

### System Requirements
- [Node.js](https://nodejs.org) *>= v6*
- [SQLcl](http://www.oracle.com/technetwork/developer-tools/sqlcl/overview/index.html) *>= v17.2 (optional, used for the publish feature)*

### Install
Execute this command to install APEX Nitro:
```
npm install -g apex-nitro
```

### Project Configuration
Execute this command to configure an APEX Nitro project:
```
apex-nitro config <project>
```

A new browser tab will open and you can simply fill the form:

![](/docs/img/command-config.png)

*You can read about the different options by hovering the help icons.*

### APEX Application Setup
APEX Nitro requires to make one small modification to your APEX application to allow real-time synchronization. Head to Shared Components, under Application Processes and create a new application process with the following attributes:

Attribute | Value
--- | ---
Name | `APEX Nitro`
Sequence | `-999`
Process Point | `On Load: Before Header (page template header)`
Condition | `owa_util.get_cgi_env('APEX-Nitro') is not null`
Source (`PL/SQL`) | `apex_application.g_flow_images := owa_util.get_cgi_env('APEX-Nitro');` 

![](/docs/img/setup-application-process.png)

[Read the documentation](/docs/setup.md) for more information.

### Launch
```
apex-nitro launch <project>
```

![](/docs/img/command-launch.png)

### Usage
After APEX Nitro is launched, create, edit or delete any file within your project's source folder. Example `/my_project/src/`:
```
|-/src/
   |-css
      |-app.css
   |-js
      |-app.js
```

APEX Nitro will compile your files to a new folder of your choice. Example `/my_project/dist/`.
APEX Nitro will then synchronize the compiled folder (`/my_project/dist/`) to your APEX application.

[**Read more about usage.**](/docs/usage.md)  
[**See common patterns.**](/docs/patterns.md)  
[**Try our examples.**](/examples/)

### Publish to APEX
When you are done developing, you can upload your files to the *Shared Components* in APEX.

```
apex-nitro publish <project>
```

![](/docs/img/command-publish.png)

This feature is optional. [Read more](/docs/publish.md) to get SQLcl running on your environment.

## Troubleshoot
[Read more about common issues.](/docs/troubleshooting.md)

## Changelog
[See changelog.](changelog.md)

## Project Sponsors
[Insum Solutions](http://insum.ca/)

## Team
- [Vincent Morneau](https://github.com/vincentmorneau)
- [Martin Giffy D'Souza](https://github.com/martindsouza)
