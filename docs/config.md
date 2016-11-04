# Configuration

```
afeb config <project>
```

## Options

### Global

Name | Type | Default | Description
--- | --- | -- |
`App URL` | string | | This is the URL to your APEX application homepage.
`Source Folder` | string | | This is the path to your application src folder. If nothing is filled, the current repository will be used with the `/src/` folder. This is the URL to your APEX application homepage.
`Dist Folder` | string | | This is the path to your application dist folder. If nothing is filled, the current repository will be used with the `/dist/` folder.


### Javascript Concatenation

Name | Type | Default | Description
-- | -- | -- | --
`Enabled` | boolean | `false` | Turns on and off the javascript concatenation feature.
`Final Name` | string | `app` | Represents the name of the final file, after concatenation. Only applies if `Enabled` is `true`. Will become `app.js` and `app.min.js`

### CSS Concatenation

Name | Type | Default | Description
-- | -- | -- | --
`Enabled` | boolean | `false` | Turns on and off the javascript concatenation feature.
`Final Name` | string | `app` | Represents the name of the final file, after concatenation. Only applies if `Enabled` is `true`. Will become `app.css` and `app.min.css`

### Sass

Name | Type | Default | Description
-- | -- | -- | --
`Enabled` | boolean | `false` | Turns on and off the sass parsing feature.
`Include Path` | string | | Include a path to an external sass folder. Allows to use the `@import` feature from within that folder.

### Less

Name | Type | Default | Description
-- | -- | -- | --
`Enabled` | boolean | `false` | Turns on and off the less parsing feature.
`Include Path` | string | | Include a path to an external less folder. Allows to use the `@import` feature from within that folder.

### Browsersync

Name | Type | Default | Description
-- | -- | -- | --
`Enabled` | boolean | `false` | Turns on and off the browsersync feature.
`Notify` | boolean | `true` | This option makes browsersync alert you when a file is dynamically injected to you browser.
`Ghost Mode` | boolean | `true` | This option makes clicking, scrolling and typing being replicated on all devices.
`Port` | int | `3000` | This is the port that browsersync uses to serve your static files.
`UI Port` | int | `3001` | Browsersync includes a user-interface that is accessed via a separate port.
`Weinre Port` | int | `8080` | This is the weinre port that browsersync uses.

### Header

Name | Type | Default | Description
-- | -- | -- | --
`Enabled` | boolean | `false` | Turns on and off the automatic header comment block feature.
`package.json Path` | string | | Points to your project's `package.json` file. Only applies if `Enabled` is `true`.

### Theme Roller

Name | Type | Default | Description
-- | -- | -- | --
`Enabled` | boolean | `false` | Turns on and off the Theme Roller feature. This will generate a `less` file that you can import into your application theme style. It will add editable variables to theme roller.
`Final Name` | string | `themeroller` | Represents the name of the final less file, after concatenation from the array `paths`. Only applies if `Enabled` is `true`. `paths` | array | | Include the order of `scss` files to be parsed by theme roller.

### Image Optimization

Name | Type | Default | Description
-- | -- | -- | --
`Enabled` | boolean | `false` | Turns on and off automatic image lossless optimizers.
