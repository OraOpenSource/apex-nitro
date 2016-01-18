# APEX Front-End Boost

This helps APEX you work on web files (`js`, `css`, `images`, etc...) within an APEX application. It creates a local web server to host local files which allows you to work on these files locally without having to upload them to APEX or a web server each time.

When a file is change the APEX page will either automatically refresh (for `js` files) or reload `css` files without refreshing the page. This can cut down development time by not having to manually refresh.

The local web server can be configured so that only you will see the changes that you make and not affect any other users until you move the files to the web server or into the APEX application. This is very helpful as you don't need to worry about causing errors or issues for others while developing. Read the docs ([apex-items](docs/application-item.md) and [application-process](docs/application-process.md)) on how to setup APEX to support this functionality.

TODO: include animated gif (#19) of this project in action.


## Project Sponsors
Thanks to [Insum Solutions](http://insum.ca/) for sponsoring this project.

## Features
- [Browsersync](http://www.browsersync.io/)
    - Write Javascript and CSS in your favorite code editor.
    - As you save, changes are automatically pushed to your application, no need to refresh your browser anymore.
    - Navigate in your application from your desktop and see your mobile device imitate your actions as you scroll and click anywhere.
- [Sass Parsing](http://sass-lang.com/)
    - Write Sass instead of regular CSS.
    - Sass is automatically parsed to CSS as you write it.
- CSS and JS concatenation & minification
- [Autoprefixer](https://github.com/postcss/autoprefixer)
    - Vendor prefixes are automatically added to your CSS.
- Sourcemaps
    - Be able to retrace your source code from the final concatenated and minified file.
- Filesize indicator
    - Be notified of the difference between your source file and final file.
- Error handling
    - Javascript and CSS errors will trigger notifications as you save.

## Install
```bash
git clone https://github.com/OraOpenSource/apex-frontend-boost.git
cd apex-frontend-boost
npm install
```

### Installing on Windows?
[See documentation](/docs/windows.md).

## Configuration
You will want to configure for your project. [See documentation](/docs/config.json.md).

## Setup
#### Application Item
One mandatory application item to add. [See documentation](/docs/application-item.md).

#### Application Process
One mandatory application process to add. [See documentation](/docs/application-process.md).

## Run
`npm start -- --project=yourProjectName`

## Usage
From the `src` folder you can create, edit or delete any files in:
```
|-/src/
	|-scss
    |-css
    |-img
    |-js
    |-lib
```

Gulp will automatically compile your files to this folder structure:
```
|-/dist/
    |-css
    |-img
    |-js
    |-lib
```

### Using with multiple devices
[See documentation](/docs/multiple-devices.md).

### Self-Signed SSL Browser Warning
[See documentation](/docs/ssl-warning.md).

## Changelog
[See changelog](changelog.md).

## Project Team
- [Vincent Morneau](https://github.com/vincentmorneau)
- [Martin Giffy D'Souza](https://github.com/martindsouza)
