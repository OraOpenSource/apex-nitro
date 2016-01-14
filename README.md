# APEX Front-End Boost
It's all about automation.

Enhance your productivity with a complete Front-End Stack for Oracle APEX development.

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

### Self-Signed SSL Browser Warning
[See documentation](/docs/ssl-warning.md).

## Changelog
[See changelog](changelog.md).

## Project Team
- [Vincent Morneau](https://github.com/vincentmorneau)
- [Martin Giffy D'Souza](https://github.com/martindsouza)
