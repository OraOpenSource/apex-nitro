<h1 align="center">
	<br>
	<img src="https://raw.githubusercontent.com/OraOpenSource/apex-nitro/master/docs/img/apex-nitro-logo.png" alt="APEX Nitro" width="600">
	<br>
	<br>
</h1>

> Your essential APEX companion

[![npm](https://img.shields.io/npm/v/apex-nitro.svg)](https://www.npmjs.com/package/apex-nitro) [![Build Status](https://travis-ci.org/OraOpenSource/apex-nitro.svg?branch=master)](https://travis-ci.org/OraOpenSource/apex-nitro) [![Dependency Status](https://david-dm.org/OraOpenSource/apex-nitro.svg)](https://david-dm.org/OraOpenSource/apex-nitro) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

APEX Nitro makes front-end coding faster and easier by syncing static files more efficiently within an APEX application.

## What APEX Nitro does  
- Browser Synchronization
- Minification
- Concatenation
- Source Mapping
- Error Handling
- CSS Preprocessing
- CSS Auto-Prefixer
- Theme Roller Customization

For more info on the features, [read the documentation](/docs/features.md).

## Additional Benefits
- Reduce development time
- Reduce mundane tasks
- Increase maintainability
- Better modularization
- Performance boost
- Enhances teamwork
- Makes responsive development easier

For more info on the benefits, [read the documentation](/docs/benefits.md).

## System Requirements
- [Node.js](https://nodejs.org) *>= v6*
- [SQLcl](http://www.oracle.com/technetwork/developer-tools/sqlcl/overview/index.html) *>= v17.2 (optional, used for the publish feature)*

## Install
```
npm install -g apex-nitro
```

*Note: you might encounter a few deprecation warnings during the installation. This is normal and we monitor these packages upon every release of APEX Nitro.*

*Having problems on [Windows?](/docs/windows.md) [macOS?](/docs/macOS.md) [Linux?](/docs/linux.md)*

## Project Configuration
Before you can use APEX Nitro, execute the command below to configure your project.

```
apex-nitro config <project>
```

![](/docs/img/command-config.png)

*You can read about the different options by hovering the help icons.*

## APEX Application Setup
[Read the documentation](/docs/setup.md) as you have to make one small modification to your APEX application.

## Launch
```
apex-nitro launch <project>
```

![](/docs/img/command-launch.png)

## Usage
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

## Publish to APEX
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
