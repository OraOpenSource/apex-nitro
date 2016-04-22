# APEX Front-End Boost Configuration

A basic `config.json` file is generated when the project's installed:
```json
{
    "yourProject1Name": {
        "appURL": "yourApplicationURL",
        "srcFolder": "yourSrcFolder",
        "distFolder": "yourDistFolder"
    },
    "yourProject2Name": {
        "appURL": "yourApplicationURL",
        "srcFolder": "yourSrcFolder",
        "distFolder": "yourDistFolder"
    }
}
```

It needs to be configured to your project needs. Example:
```json
{
    "sandbox": {
        "appURL": "https://apex.oracle.com/pls/apex/f?p=10344:101",
        "srcFolder": "C:\\APEX\\sandbox\\src",
        "distFolder": "C:\\APEX\\sandbox\\dist",
        "sass": {
            "enabled": true
        }
    }
}
```

It is only mandatory to fill out the `appURL` in `config.json`. The rest is optional and will be substituted from `default.json`:
```json
{
    "appURL": "",
    "srcFolder": "src",
    "distFolder": "dist",
    "header": {
        "enabled": false,
        "packageJsonPath": ""
    },
    "jsConcat": {
        "enabled": true,
        "finalName": "app"
    },
    "cssConcat": {
        "enabled": true,
        "finalName": "app"
    },
    "sass": {
        "enabled": false,
        "includePath": ""
    },
    "less": {
        "enabled": false,
        "includePath": ""
    },
    "browsersync": {
        "enabled": true,
        "port": 3000,
        "notify": true
    },
    "themeroller":{
        "enabled": false,
        "finalName": "themeroller",
        "files" : []
    },
    "rtl": {
        "enabled": false
    }
}
```

##Read below for more information about each fields.

### Application

**`appURL`** : `string`, default ``
> This is the URL to your APEX application homepage.

**`srcFolder`** : `string`, default `src`
> This is the path to your application src folder.
> If nothing is filled, the current repository will be used with the `/src/` folder.
> This is the URL to your APEX application homepage.

**`distFolder`** : `string`, default `dist`
> This is the path to your application dist folder.
> If nothing is filled, the current repository will be used with the `/dist/` folder.

### Javascript Concatenation

**`jsConcat.enabled`** : `boolean`, default `true`
> Turns on and off the javascript concatenation feature.

**`jsConcat.finalName`** : `string`, default `app`
> Represents the name of the final file, after concatenation.  
> Only applies if `jsConcat.enabled` is `true`.  
> Will become `app.js` and `app.min.js`

### Header

**`header.enabled`** : `boolean`, default `true`
> Turns on and off the automatic header comment block feature.

**`header.packageJsonPath`** : `string`
> Represents the path to your project's `package.json` file.
> Only applies if `header.enabled` is `true`.  
> Will output a standardized comment block at the start of `js` and `css` files.  
> Example:
```js
/*!
 * apex-frontend-boost - Enhance your productivity with a complete Front-End Stack for Oracle APEX development
 * @version v2.0.0
 * @link https://github.com/OraOpenSource/apex-frontend-boost
 * @license MIT
 */
```

### CSS Concatenation

**`cssConcat.enabled`** : `boolean`, default `true`
> Turns on and off the css concatenation feature.

**`cssConcat.finalName`** : `string`, default `app`
> Represents the name of the final file, after concatenation.  
> Only applies if `cssConcat.enabled` is `true`.  
> Will become `app.css` and `app.min.css`

### Sass

**`sass.enabled`** : `boolean`, default `false`
> Turns on and off the sass parsing feature.

**`sass.includePath`** : `string`
> Include a path to an external sass folder. Allows to use the `@import` feature from within that folder.

*When using Sass, please ensure that Less is turned off.*

### Less

**`less.enabled`** : `boolean`, default `false`
> Turns on and off the less parsing feature.

**`less.includePath`** : `string`
> Include a path to an external less folder. Allows to use the `@import` feature from within that folder.

*When using Less, please ensure that Sass is turned off.*

### Browsersync

**`browsersync.enabled`** : `boolean`, default `false`
> Turns on and off the browsersync feature.

**`browsersync.port`** : `int`, default `3000`
> This is the port that browsersync will use to serve your static files.

**`browsersync.notify`** : `boolean`, default `true`
> This option makes browsersync alert you when a file is dynamically injected to you browser.  
> Useful for Javascript & CSS development, as you won't have to manually refresh your browser.

### Theme Roller

**`themeroller.enabled`** : `boolean`, default `false`
> Turns on and off the Theme Roller feature. This will generate a `less` file that you can import into your application theme style. It will add editable variables to theme roller.

**`themeroller.finalName`** : `string`, default `themeroller`
> Represents the name of the final less file, after concatenation from the array `themeroller.paths`.  
> Only applies if `themeroller.enabled` is `true`.

**`themeroller.paths`** : `array`
> Include the order of `scss` files to be parsed by theme roller.

### RTLCSS

**`rtl.enabled`** : `boolean`, default `false`
> Turns on and off automatic `css` transformation from Left-To-Right (LTR) to Right-To-Left (RTL) languages.
> Produces a `.rtl` version of your css files
> Example: `app.css` also produces `app.rtl.css`
